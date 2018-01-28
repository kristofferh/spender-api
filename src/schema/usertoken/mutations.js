import { GraphQLString, GraphQLNonNull } from "graphql";

import UserTokenType from "./type";
import { requestToken } from "./resolvers";

// Log in
export const requestNewToken = {
  type: UserTokenType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: requestToken
};
