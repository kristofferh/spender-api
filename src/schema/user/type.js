import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray
} from "graphql-relay";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLEnumType
} from "graphql";
import { createConnection } from "graphql-sequelize";

import models from "../../models";
import ItemType from "../item/type";
import TagType from "../tag/type";
import { auth } from "../../services/auth";

const { User, Item } = models;

const { connectionType: UserTagsConnection } = connectionDefinitions({
  name: "UserTags",
  nodeType: TagType
});

const userItemConnection = createConnection({
  name: "UserItems",
  nodeType: ItemType,
  target: Item, // Can be an association for parent related connections or a model for "anonymous" connections
  // if no orderBy is specified the model primary key will be used.
  orderBy: new GraphQLEnumType({
    name: "UserItemsOrderBy",
    values: {
      DATE: { value: ["date", "DESC"] }, // The first ENUM value will be the default order. The direction will be used for `first`, will automatically be inversed for `last` lookups.
      AMOUNT: { value: ["amount", "DESC"] }
    }
  }),
  before: (findOptions, args, context) => {
    const id = auth(context);
    findOptions.where = { UserId: id };
    return findOptions;
  },
  connectionFields: {
    total: {
      type: GraphQLInt,
      resolve: ({ source }) => {
        /*
         * We return a object containing the source, edges and more as the connection result
         * You there for need to extract source from the usual source argument
         */
        return source.countItems();
      }
    }
  }
});

const UserType = new GraphQLObjectType({
  name: User.name,
  description: "This represents a User",
  fields: () => {
    return {
      id: {
        type: GraphQLInt
      },
      email: {
        type: GraphQLString
      },
      token: {
        type: GraphQLString
      },
      item: {
        description: "The user's items",
        type: userItemConnection.connectionType,
        args: userItemConnection.connectionArgs,
        resolve: userItemConnection.resolve
      },
      tags: {
        type: UserTagsConnection,
        description: "The user's tags",
        args: connectionArgs,
        resolve(user, args) {
          return connectionFromPromisedArray(user.getTags(), args);
        }
      }
    };
  }
});

export default UserType;
