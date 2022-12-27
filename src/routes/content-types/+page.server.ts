import { contentTypes } from '$lib/server/database';

export async function load() {
  return ({
    contentTypes: await contentTypes.find({})
  });
}