import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull
} from "graphql";

import { createNodeInterface } from "graphql-sequelize";

import GraphQLDate from "graphql-date";

import models from "../../models";

import { itemTagsConnection } from "./connections";

const { Item } = models;

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
      description: "The tags belonging to the item",
      type: itemTagsConnection.connectionType,
      args: itemTagsConnection.connectionArgs,
      resolve: itemTagsConnection.resolve
    }
  })
});

export default ItemType;
