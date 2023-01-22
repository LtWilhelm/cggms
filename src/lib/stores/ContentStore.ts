import type { IContent } from '$lib/types';
import { writable } from 'svelte/store';

export const ContentStore = writable<IContent>();
export const ContentService = () => {
  let content: IContent;

  ContentStore.subscribe(c => content = c)

  const get = async (id?: string) => {
    const ids = id?.split('.');
    let last = { ...content };

    for (const id of ids || []) {
      if (!last) break;
      last = last[id] as any;
    }

    return last;
  }

  return {
    get
  }
}

export const ContentReady = writable<Record<string, boolean>>({}, (set) => () => set({}));
