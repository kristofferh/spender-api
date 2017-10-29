import { GraphQLObjectType } from "graphql";

// App Imports
import * as item from "./item/mutations";
import * as user from "./user/mutations";

// Mutation
const mutation = new GraphQLObjectType({
  name: "mutations",
  description: "Functions to update things",

  fields: () => ({
    ...item,
    ...user
  })
});

export default mutation;
