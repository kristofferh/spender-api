// Imports
import { GraphQLObjectType } from "graphql";

// App Imports
//import * as thought from './thoughts/fields/mutations'

// Mutation
const mutation = new GraphQLObjectType({
  name: "mutations",
  description: "Functions to update things",

  fields: () => ({})
});

export default mutation;
