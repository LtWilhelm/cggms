import { formBody } from '$lib/formHelpers';
import { Component } from '$lib/server/database';
import type { IComponent } from '$lib/types';
import type { Actions } from './$types';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
  const component: IComponent = (await Component.findOne({ _id: params.id }, { _id: 0 }).lean());
  const components: Partial<IComponent>[] = await (await Component.find({}, { name: 1 }).lean()).map(d => ({ name: d.name, _id: d._id.toString() }));

  for (const att of component.attributes) {
    att._id = att._id?.toString();
    att.attributes = JSON.parse(JSON.stringify(att.attributes))
  }
  for (const tag of component.metatags) {
    tag._id = tag._id?.toString();
  }

  return {
    component,
    components
  }
}

export const actions: Actions = {
  default: async (event) => {
    const data = formBody(await event.request.formData());
    
    console.log(data);

    const id = event.params.id
    
    await Component.findByIdAndUpdate(id, data);

    return {success: true}
  }
}