import { getAssetUrl, putAssetUrl } from "../../services/aws";
import { auth } from "../../services/auth";

export async function requestSignedAssetURL(_, { contentType }, ctx) {
  const id = auth(ctx);
  const url = await putAssetUrl(id, contentType);
  return { url };
}

export async function getAssetURL(_, { key }, ctx) {
  const id = auth(ctx);
  return await getAssetUrl(id, key);
}
