import { GraphQLObjectType } from "graphql";

// App Imports
import * as item from "./item/query";
import * as user from "./user/query";
// Query
const query = new GraphQLObjectType({
  name: "query",
  description: "This is the root query",

  fields: () => ({
    ...item,
    ...user
  })
});

export default query;
