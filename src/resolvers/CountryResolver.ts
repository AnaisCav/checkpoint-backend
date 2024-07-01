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

    await newCountry.save();

    return Country.findOne({
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
      where: {
        continentCode: {
          code: continentCode,
        },
      },
    });
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("code", { nullable: true }) code: string) {
    return await Country.findOne({
      where: { code },
    });
  }
}

export default CountryResolver;
