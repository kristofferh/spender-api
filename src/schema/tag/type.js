// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

const TagType = new GraphQLObjectType({
  name: "Tag",
  description: "This represents a Tag",

  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    }
  })
});

export default TagType;
