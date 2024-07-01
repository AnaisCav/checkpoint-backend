import { buildSchema } from "type-graphql";
import CountryResolver from "./resolvers/CountryResolver";

export default buildSchema({
  resolvers: [CountryResolver],
});
