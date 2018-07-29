import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull
} from "graphql";

import { createNodeInterface } from "graphql-sequelize";

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray
} from "graphql-relay";

import GraphQLDate from "graphql-date";

import models from "../../models";
import TagType from "../tag/type";

const { Item } = models;

const { connectionType: ItemTagsConnection } = connectionDefinitions({
  nodeType: TagType
});

const { nodeInterface } = createNodeInterface(Item);

const ItemType = new GraphQLObjectType({
  name: Item.name,
  description: "This represents an Item",
  interfaces: [nodeInterface],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID) // @todo: replace with globalIdField()
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
        return connectionFromPromisedArray(item.getTags(), args);
      }
    }
  })
});

export default ItemType;
