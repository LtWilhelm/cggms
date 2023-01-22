import { Component } from '$lib/server/database';
import type { IComponent } from '$lib/types';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
  const component: IComponent = (await Component.findOne({ _id: params.id }, { _id: 0, attributes: { _id: 0 }, metatags: { _id: 0 }, components: {_id: 0} }).lean());
  const components: Partial<IComponent>[] = await (await Component.find({}, { name: 1 }).lean()).map(d => ({ name: d.name, _id: d._id.toString() }));

  return {
    component,
    components
  }
}

export const actions: import('./$types').Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const attributes = (data.get('attributes') as string)?.split(',').map((a: string) => {
      // eslint-disable-next-line prefer-const
      let [name, type, ref] = a.split('::');
      if ((type === 'reference' || type === 'component') && ref) type = type + '__' + ref;

      return {
        key: name,
        value: type
      }
    })
    
    const doc = {
      name: data.get('name'),
      attributes: attributes,
      components: attributes.filter(a => a.value.startsWith("component__")).map(a => a.value.split('__')[1]),
      metatags: (data.get('metadata') as string)?.split(',').map((t: string) => {
        const [key, value] = t.split('::');
        return {key, value}
      }).filter(t => t.key && t.value)
    }

    const id = event.params.id
    
    await Component.findByIdAndUpdate(id, doc);

    return {success: true}
  }
}