import { getAssetUrl, putAssetUrl } from "../../services/aws";
import { auth } from "../../services/auth";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function requestSignedAssetURL(_, { contentType, file }, ctx) {
  const id = auth(ctx);
  const ext = file ? path.extname(file) : "";
  const key = `${id}/${uuidv4()}${ext}`;
  const url = await putAssetUrl(key, contentType);
  return { url, key };
}

export async function getAssetURL(_, { key }, ctx) {
  const id = auth(ctx);
  const url = await getAssetUrl(id, key);
  return { url };
}
