import { contentTypes } from '$lib/server/database';

export const load: import('./$types').PageServerLoad = async () => {
  const components = await (await contentTypes.find({}, {name: 1}).lean()).map(d => ({...d, _id: d._id.toString()}));

  return ({
    components
  });
}