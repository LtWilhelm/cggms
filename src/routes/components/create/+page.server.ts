import { contentTypes } from '$lib/server/database';
import type { IComponent } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const load: import('./$types').PageServerLoad = async () => {
  const components: Partial<IComponent>[] = await (await contentTypes.find({}, { name: 1 }).lean()).map(d => ({ name: d.name, _id: d._id.toString() }));

  return ({
    components
  });
}

export const actions: import('./$types').Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const doc = {
      name: data.get('name'),
      attributes: (data.get('attributes') as string)?.split(',').map((a: string) => {
        // eslint-disable-next-line prefer-const
        let [name, type, ref] = a.split('::');
        if (type === 'ref' && ref) type = type + '__' + ref;

        return {
          key: name,
          value: type
        }
      }),
      metatags: (data.get('metadata') as string)?.split(',').map((t: string) => {
        const [key, value] = t.split('::');
        return {key, value}
      }).filter(t => t.key && t.value)
    }

    const comp = await contentTypes.create(doc);

    throw redirect(307, `/components/${comp._id.toString()}`)
  }
}