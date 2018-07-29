import { GraphQLList } from "graphql";

import UserType from "./type";
import { getAll, currentUser } from "./resolvers";

// All users
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
};

// Current user.
export const user = {
  type: UserType,
  resolve: currentUser
};
