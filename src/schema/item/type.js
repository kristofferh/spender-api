// Imports
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from "graphql";

const ItemType = new GraphQLObjectType({
  name: "Item",
  description: "This represents an Item",

  fields: () => ({
    id: {
      type: GraphQLInt
    },
    date: {
      type: GraphQLString
    },
    amount: {
      type: GraphQLFloat
    },
    description: {
      type: GraphQLString
    }
  })
});

export default ItemType;
