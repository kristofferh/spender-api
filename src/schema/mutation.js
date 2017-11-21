import { GraphQLObjectType } from "graphql";

// App Imports
import * as item from "./item/mutations";
import * as user from "./user/mutations";
import * as tag from "./tag/mutations";

// Mutation
const mutation = new GraphQLObjectType({
  name: "mutations",
  description: "Functions to update things",

  fields: () => ({
    ...item,
    ...user,
    ...tag
  })
});

export default mutation;
