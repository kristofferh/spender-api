import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

import models from "../../models";

import { userItemsConnection, userTagsConnection } from "./connections";

const { User } = models;

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
      items: {
        description: "The user's items",
        type: userItemsConnection.connectionType,
        args: {
          ...userItemsConnection.connectionArgs,
          description: {
            type: GraphQLString
          },
          startDate: {
            type: GraphQLString
          },
          endDate: {
            type: GraphQLString
          }
        },
        resolve: userItemsConnection.resolve
      },
      tags: {
        description: "The user's tags",
        type: userTagsConnection.connectionType,
        args: userTagsConnection.connectionArgs,
        resolve: userTagsConnection.resolve
      }
    };
  }
});

export default UserType;
