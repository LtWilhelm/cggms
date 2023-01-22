import { Content } from '$lib/server/database';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async({url}) => {
  const ids = url.searchParams.get('ids');
  const content = await Content.find({
    component: {
      $in: ids?.split('::')
    },
  }, {title: 1}).lean();
  
  return new Response(JSON.stringify(content));
}