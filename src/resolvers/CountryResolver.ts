import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Int,
  Ctx,
  Authorized,
} from "type-graphql";
import { Like } from "typeorm";
import Country, { NewCountryInput } from "../entities/Country";

@Resolver(Country)
class CountryResolver {
  @Mutation(() => Country)
  async createCountry(@Arg("data", { validate: true }) data: NewCountryInput) {
    const newCountry = new Country();
    Object.assign(newCountry, data);
    const { id } = await newCountry.save();
    return Country.findOne({
      where: { id },
      relations: { continentCode: true },
    });
  }

  @Query(() => [Country])
  async getCountries(
    @Arg("continentCode", () => String, { nullable: true })
    continentCode?: string
  ) {
    return await Country.find({
      relations: { continentCode: true },
    });
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("code", { nullable: true }) code: string) {
    return await Country.findOne({
      where: { code },
      relations: { continentCode: true },
    });
  }

  @Query(() => [Country])
  async getCountriesByContinent(
    @Arg("continentCode", () => String) code: string
  ): Promise<void | Country[]> {
    const countries = await Country.find({
      where: {
        continentCode: {
          code: code,
        },
      },
      relations: { continentCode: true },
    });

    return countries;
  }
}

export default CountryResolver;
