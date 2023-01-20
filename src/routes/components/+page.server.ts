import { Component } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: import('./$types').PageServerLoad = async () => {
  const components = await (await Component.find({}, {name: 1}).lean()).map(d => ({...d, _id: d._id.toString()}));

  return ({
    components
  });
}

export const actions:Actions = {
  default: async () => {
    const component = await Component.create({name: 'New Component'});

    throw redirect(307, '/components/' + component._id.toString());
  }
}