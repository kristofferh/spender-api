import { GraphQLInt, GraphQLList } from "graphql";

import UserType from "./type";
import { getAll, getById } from "./resolvers";

// All users
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
};

// User by ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
};
