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
    const newCountryWithId = await newCountry.save();
    return newCountryWithId;
  }

  @Query(() => [Country])
  async getCountries() {
    return await Country.find();
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("code", { nullable: true }) code: string) {
    return await Country.findOne({
      where: { code },
    });
  }
}

export default CountryResolver;
