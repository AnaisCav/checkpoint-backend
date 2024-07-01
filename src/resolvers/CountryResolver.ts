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
  async countries(@Arg("name", { nullable: true }) name: string) {
    return await Country.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
      order: { id: "desc" },
    });
  }
}

export default CountryResolver;
