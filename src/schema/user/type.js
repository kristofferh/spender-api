// Imports
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from "graphql";

import ItemType from "../item/type";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a User",
  fields: () => {
    return {
      id: {
        type: GraphQLInt
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString,
        resolve(user) {
          return user.passwordHash;
        }
      },
      items: {
        type: new GraphQLList(ItemType),
        resolve(user) {
          return user.getItems();
        }
      }
    };
  }
});

export default UserType;
