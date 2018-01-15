import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} from "graphql";

import GraphQLDate from "graphql-date";

import TagType from "../tag/type";

const ItemType = new GraphQLObjectType({
  name: "Item",
  description: "This represents an Item",

  fields: () => ({
    id: {
      type: GraphQLInt
    },
    date: {
      type: GraphQLDate
    },
    amount: {
      type: GraphQLFloat
    },
    description: {
      type: GraphQLString
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve(item) {
        return item.getTags();
      }
    }
  })
});

export default ItemType;
