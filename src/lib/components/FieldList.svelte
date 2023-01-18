<script lang="ts">
  import type { IComponent, IField } from "$lib/types";
  import { createEventDispatcher } from 'svelte';

  export let fields: IField[];
  export let components: IComponent[];

  const dispatch = createEventDispatcher();
</script>

<ul class="etched h-min">
  {#each fields as field}
    <li class="p-4 odd:bg-black/10 flex justify-between items-center">
      <div>
        <span>{field.name}</span>
        <span class="ml-2 text-gray-500">{field.type === 'reference' ? components.find(c => c._id === field.ref) : field.type}</span>
      </div>
      <button on:click={() => dispatch('delete', field.name)} class="bg-red-100">Delete</button>
    </li>
  {/each}
</ul>
