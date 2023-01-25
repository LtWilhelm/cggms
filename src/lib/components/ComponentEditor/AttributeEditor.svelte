<script lang="ts">
  import type { IAttribute } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  export let attribute: IAttribute<string | number | boolean>;
  // export let attribute.value: string | number | boolean;

  // const dispatch = createEventDispatcher();

  // $: dispatch('change', attribute);
</script>

<span class="capitalize">
  <p>{attribute.key}</p>
  {#each attribute.attributes || [] as help}
    {#if help.key === "help"}
      <small>{help.value}</small>
    {/if}
  {/each}
</span>
<span class="h-min inline-block">
  {#if typeof attribute.value === "boolean"}
    <input type="checkbox" bind:checked={attribute.value} />
  {:else if typeof attribute.value === "number"}
    <input class="max-w-min" type="number" bind:value={attribute.value} />
  {:else}
    <input type="text" bind:value={attribute.value} />
  {/if}
</span>
