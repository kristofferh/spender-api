import AWS from "aws-sdk";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";

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

export async function putAssetUrl(userId, contentType) {
  const key = `${userId}/${uuidv4()}`;
  return await s3.getSignedUrlPromise("putObject", {
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
    Expires: 120,
  });
}

export async function getAssetUrl(userId, key) {
  return await s3.getSignedUrlPromise("getObject", {
    Bucket: bucket,
    Key: `${userId}/${key}`,
    Expires: 300,
  });
}
