import type { IComponent } from '$lib/types';
import { writable } from 'svelte/store';

const ComponentStore = writable(new Map<string, IComponent>());

export const ComponentService = () => {
  let components: Map<string, IComponent>;
  
  ComponentStore.subscribe(c => components = c)
  
  const get = async (id?: string) => {
    if (!id) return;
    let component = components.get(id);
    if (!component) {
      component = await (await fetch('/components/' + id)).json();
      ComponentStore.update(components => {
        component && components.set(id, component);
        return components;
      })
    }
    return component;
  }
  
  return {
    get
  }
}
