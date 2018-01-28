import { GraphQLObjectType, GraphQLBoolean } from "graphql";

const UserTokenType = new GraphQLObjectType({
  name: "UserToken",
  description: "This represents a UserToken, which is what is used to sign in.",
  fields: () => {
    return {
      success: {
        type: GraphQLBoolean,
        resolve(token) {
          if (token) {
            return true;
          }
          return false;
        }
      }
    };
  }
});

export default UserTokenType;
