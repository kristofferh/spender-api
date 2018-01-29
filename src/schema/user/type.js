import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from "graphql";

import ItemType from "../item/type";
import TagType from "../tag/type";

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
      token: {
        type: GraphQLString
      },
      items: {
        type: new GraphQLList(ItemType),
        resolve(user) {
          return user.getItems();
        }
      },
      tags: {
        type: new GraphQLList(TagType),
        resolve(user) {
          return user.getTags();
        }
      }
    };
  }
});

export default UserType;
