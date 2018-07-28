import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  nodeDefinitions,
  fromGlobalId,
  globalIdField
} from "graphql-relay";

import GraphQLDate from "graphql-date";

import models from "../../models";
import TagType from "../tag/type";

const { connectionType: ItemTagsConnection } = connectionDefinitions({
  nodeType: TagType
});

const { nodeInterface } = nodeDefinitions(
  globalId => {
    const { id } = fromGlobalId(globalId);
    return models.Item.findById(id);
  },
  obj => {
    console.log("hi", obj);
    //return obj.ships ? factionType : shipType;
  }
);

const ItemType = new GraphQLObjectType({
  name: "Item",
  description: "This represents an Item",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
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
        return connectionFromPromisedArray(item.getTags(), args);
      }
    }
  })
});

export default ItemType;
