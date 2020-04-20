import AWS from "aws-sdk";
import { config } from "dotenv";

// Load .env variables
config();

// Configuring AWS
AWS.config = new AWS.Config({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.S3_BUCKET_REGION,
});

// Creating a S3 instance
const s3 = new AWS.S3();

// Retrieving the bucket name from env variable
const bucket = process.env.S3_BUCKET;

export async function putAssetUrl(key, contentType) {
  return await s3.getSignedUrlPromise("putObject", {
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
    Expires: 120,
  });
}

export async function getAssetUrl(key) {
  return await s3.getSignedUrlPromise("getObject", {
    Bucket: bucket,
    Key: key,
    Expires: 300,
  });
}
