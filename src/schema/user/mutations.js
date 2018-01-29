import { GraphQLString, GraphQLInt, GraphQLNonNull } from "graphql";

import UserType from "./type";
import { authenticate, create, remove } from "./resolvers";

// Log in
export const login = {
  type: UserType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: authenticate
};

// Create user
export const addUser = {
  type: UserType,
  args: {
    email: {
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
