import { Content } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const content = await (await Content.find({}).lean()).map(c => ({title: c.title, _id: c._id.toString()}))

  return {
    content
  }
}

export const actions: Actions = {
  default: async () => {
    const content = await Content.create({});

    throw redirect(307, '/content/' + content._id.toString());
  }
}