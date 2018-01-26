import { GraphQLString, GraphQLInt, GraphQLNonNull } from "graphql";

import UserType from "./type";
import { create, remove } from "./resolvers";

// Create user
export const addUser = {
  type: UserType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: create
};

// Remove user
export const removeUser = {
  type: UserType,
  args: {
    id: {
      name: "id",
      type: GraphQLInt
    }
  },
  resolve: remove
};
