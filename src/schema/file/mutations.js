import { GraphQLString } from "graphql";
import FileType from "./type";
import { requestSignedAssetURL } from "./resolvers";

// Get a presigned upload URL.
export const requestUploadURL = {
  type: FileType,
  args: {
    contentType: {
      type: GraphQLString,
    },
    file: {
      type: GraphQLString,
    },
  },
  resolve: requestSignedAssetURL,
};
