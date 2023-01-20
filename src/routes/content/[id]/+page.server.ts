import { Component, Content } from '$lib/server/database';
import type { IComponent, IContent } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const content: Partial<IContent> = await Content.findById(params.id, { _id: 0, __v: 0 }).lean();
  const components: Partial<IComponent>[] = await (await Component.find({}, { name: 1 }).lean()).map(d => ({ name: d.name, _id: d._id.toString() }));
  const component: IComponent | null = await Component.findById(content.component, { __v: 0 }).lean();

  if (component) {
    component._id = component._id.toString();
    component.attributes = component.attributes.map(a => ({...a, _id: a._id.toString()}))
  }

  return { content, components, component }
}

// export const actions: Actions = {
//   default: async () => {
//   }
// }
