import { GraphQLObjectType } from "graphql";

// App Imports
import * as item from "./item/query";

// Query
const query = new GraphQLObjectType({
  name: "query",
  description: "This is the root query",

  fields: () => ({
    ...item
  })
});

export default query;
