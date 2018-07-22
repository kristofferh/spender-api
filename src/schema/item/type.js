import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from "graphql";

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray
} from "graphql-relay";

import GraphQLDate from "graphql-date";

import TagType from "../tag/type";

const { connectionType: ItemTagsConnection } = connectionDefinitions({
  nodeType: TagType
});

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
      type: ItemTagsConnection,
      description: "The tags used by item",
      args: connectionArgs,
      resolve(item, args) {
        console.log("neat", args);
        return connectionFromPromisedArray(item.getTags(), args);
      }
    }
  })
});

export default ItemType;
