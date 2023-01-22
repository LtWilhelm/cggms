/* eslint-disable @typescript-eslint/ban-ts-comment */
import { formBody } from '$lib/formHelpers';
import { Component, Content } from '$lib/server/database';
import { Revision } from '$lib/server/database/models/content';
import type { IComponent, IContent } from '$lib/types';
import mongoose from 'mongoose';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const content: IContent = await Content.findById(params.id, { _id: 0, __v: 0 }).lean();
  const components: Partial<IComponent>[] = await (await Component.find({}, { name: 1 }).lean()).map(d => ({ name: d.name, _id: d._id.toString() }));
  const component: IComponent | null = await Component.findById(content.component, { __v: 0 }).lean();

  if (component) {
    component._id = component._id.toString();
    component.attributes = component.attributes.map(a => ({ ...a, _id: a._id.toString() }))
  }

  return { content, components, component }
}

export const actions: Actions = {
  save: async ({ request, params }) => {
    const doc = formBody(await request.formData());

    const revision = await Revision.findById(params.id);
    await Content.findOneAndUpdate({ _id: params.id }, {...(revision || {}), ...doc});
    await revision?.remove();

    return { success: true, component: false }
  },
  component: async ({ request, params }) => {
    const doc = formBody(await request.formData());
    const heritageString = doc.heritage as string;
    if (typeof heritageString !== 'string') return;
    const heritage = heritageString.split('.') as string[]
    delete doc.heritage;
    try {
      let rev = await Revision.findById(params.id);
      if (!rev) {
        const original = await Content.findById(params.id);
        rev = new (mongoose.model('revision'))(original?.toObject());
        await rev?.save();
      }
      if (!rev) return;

      for (const key in rev) {
        if (Object.prototype.hasOwnProperty.call(rev, key)) {
          // @ts-ignore
          const element = rev[key];
          // @ts-ignore
          if (element == undefined || element === 'undefined') delete rev[key];
        }
      }

      await rev?.updateOne({
        $set: {
          [heritageString]: doc
        }
      })

      return {component: heritageString, success: true}
    } catch(e) {
      // 
      console.log(e);
    }
  }
}
