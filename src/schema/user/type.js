import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray
} from "graphql-relay";

import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

import ItemType from "../item/type";
import TagType from "../tag/type";

const { connectionType: UserItemsConnection } = connectionDefinitions({
  name: "UserItemsConnection",
  nodeType: ItemType
});

const { connectionType: UserTagsConnection } = connectionDefinitions({
  name: "UserTagsConnection",
  nodeType: TagType
});

const UserType = new GraphQLObjectType({
  name: "User",
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
      items: {
        type: UserItemsConnection,
        description: "The user's items",
        args: connectionArgs,
        resolve(user, args) {
          return connectionFromPromisedArray(user.getItems(), args);
        }
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
