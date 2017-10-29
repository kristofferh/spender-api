import { GraphQLObjectType } from "graphql";

// App Imports
import * as item from "./item/mutations";

// Mutation
const mutation = new GraphQLObjectType({
  name: "mutations",
  description: "Functions to update things",

  fields: () => ({
    ...item
  })
});

export default mutation;
