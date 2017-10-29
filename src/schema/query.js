// Imports
import { GraphQLObjectType } from "graphql";

// App Imports
// import * as thought from './thoughts/fields/query'

// Query
const query = new GraphQLObjectType({
  name: "query",
  description: "This is the root query",

  fields: () => ({})
});

export default query;
