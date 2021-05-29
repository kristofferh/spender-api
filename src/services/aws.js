import { config } from "dotenv";
import btoa from "btoa";
import { S3, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Load .env variables
config();

// Create an Amazon S3 client object.
const s3Client = new S3({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: process.env.S3_BUCKET_REGION,
});

const bucket = process.env.S3_BUCKET;
const cloudFrontUrl = process.env.CLOUDFRONT_URL;

export async function putAssetUrl(key, contentType) {
  const putObjectCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return await getSignedUrl(s3Client, putObjectCommand, {
    contentType,
    expiresIn: 120,
  });
}

export async function getAssetUrl(key) {
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  return await getSignedUrl(s3Client, getObjectCommand, {
    expiresIn: 300,
  });
}

export function getAvatarPublicUrl(key, edits = {}) {
  if (!key) {
    return "";
  }
  const imageRequest = JSON.stringify({
    bucket,
    key,
    edits,
  });
  return `${cloudFrontUrl}/${btoa(imageRequest)}`;
}
