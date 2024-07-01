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
import Continent, { NewContinentInput } from "../entities/Continent";

@Resolver(Continent)
class ContinentResolver {
  @Mutation(() => Continent)
  async createContinent(
    @Arg("data", { validate: true }) data: NewContinentInput
  ) {
    const newContinent = new Continent();
    Object.assign(newContinent, data);
    const newContinentWithId = await newContinent.save();
    return newContinentWithId;
  }

  @Query(() => [Continent])
  async getContinents() {
    return await Continent.find();
  }

  @Query(() => Continent)
  async getContinentByCode(@Arg("code", { nullable: true }) code: string) {
    return await Continent.findOne({
      where: { code },
    });
  }
}

export default ContinentResolver;
