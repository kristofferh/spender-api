import { GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import UserType from "./type";
import { edit, create, remove } from "./resolvers";

// Edit user.
export const editUser = mutationWithClientMutationId({
  name: "EditUser",
  inputFields: {
    avatar: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: (payload) => payload,
    },
  },
  mutateAndGetPayload: (input, context) => {
    return edit(input, context);
  },
});

// Create user
export const addUser = {
  type: UserType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: create,
};

// Remove user
export const removeUser = {
  type: UserType,
  args: {
    id: {
      name: "id",
      type: GraphQLInt,
    },
  },
  resolve: remove,
};
