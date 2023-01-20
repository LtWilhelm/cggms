import { Component } from '$lib/server/database';
import type { IComponent } from '$lib/types';
import type { Document } from 'mongoose';
import type { RequestHandler } from './$types';

export const GET:RequestHandler = async ({params}) => {
  const component = await Component.findById(params.id);
  // const component = await Component.findById(params.id).populate({path:'components', populate: {path:'components'}});

  // const 
  return new Response(JSON.stringify(component));
}

// const populateSubComps = async (comp: Document, present: string[] = []) => {
//   await Component.populate(comp, {
//     path: 'components',
//   })

//   comp.components
// }
