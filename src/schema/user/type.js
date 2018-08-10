import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

import models from "../../models";

import { userItemsConnection, userTagsConnection } from "./connections";

import { item } from "../item/query";
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
      item,
      items: {
        description: "The user's items",
        type: userItemsConnection.connectionType,
        args: {
          ...userItemsConnection.connectionArgs,
          description: {
            type: GraphQLString,
            description: "Search by description"
          },
          startDate: {
            type: GraphQLString,
            description:
              "The start date. Can be any date string in the order yyyy-mm-dd hh:mm"
          },
          endDate: {
            type: GraphQLString,
            description:
              "The end date. Can be any date string in the order yyyy-mm-dd hh:mm"
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
