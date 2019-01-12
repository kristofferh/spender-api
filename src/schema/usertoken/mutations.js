import { GraphQLString, GraphQLNonNull } from "graphql";

import UserTokenType from "./type";
import { requestToken, verify } from "./resolvers";

// Log in or signup.
export const requestNewToken = {
  type: UserTokenType,
  args: {
    delivery: {
      type: new GraphQLNonNull(GraphQLString)
    },
    deliveryType: {
      type: GraphQLString
    },
    deliveryPlatform: {
      type: GraphQLString
    }
  },
  resolve: requestToken
};

export const verifyToken = {
  type: UserTokenType,
  args: {
    delivery: {
      type: new GraphQLNonNull(GraphQLString)
    },
    token: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: verify
};
