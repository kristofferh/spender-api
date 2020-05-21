import { GraphQLObjectType } from "graphql";
import * as file from "./file/mutations";
import * as item from "./item/mutations";
import * as user from "./user/mutations";
import * as tag from "./tag/mutations";
import * as usertoken from "./usertoken/mutations";

// Mutation
const mutation = new GraphQLObjectType({
  name: "mutations",
  description: "Functions to update things",

  fields: () => ({
    ...item,
    ...user,
    ...tag,
    ...usertoken,
    ...file,
  }),
});

export default mutation;
