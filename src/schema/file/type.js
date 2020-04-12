import { GraphQLObjectType, GraphQLString } from "graphql";

const FileType = new GraphQLObjectType({
  name: "File",
  description:
    "This represents a File, a way to get an asset, or receive a presigned URL for file upload.",
  fields: () => {
    return {
      url: {
        type: GraphQLString,
      },
    };
  },
});

export default FileType;
