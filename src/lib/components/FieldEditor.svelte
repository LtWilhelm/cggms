<script lang="ts">
    import type { fieldTypes, IComponent } from '$lib/types';
  import { createEventDispatcher } from "svelte";

  export let components: IComponent[];

  let newFieldName: string;
  let newFieldType: fieldTypes;
  let newFieldRef: string;

  const dispatch = createEventDispatcher();

  const addField = () => {
    dispatch("newField", {
      name: newFieldName,
      type: newFieldType,
      ref: newFieldRef,
    });
    newFieldName = "";
    newFieldType = "";
    newFieldRef = "";
  };
</script>

<div class="flex gap-4 items-end">
  <label
    >Field Name: <input
      class="block mt-2"
      type="text"
      bind:value={newFieldName}
      placeholder="Name..."
    /></label
  >
  <select class="" bind:value={newFieldType}>
    <option value="">Field Type...</option>
    <option value="string">String</option>
    <option value="number">Number</option>
    <option value="reference">Reference</option>
  </select>
</div>
{#if newFieldType === "reference"}
  <select class="" bind:value={newFieldRef}>
    {#each components as component}
      <option value={component._id}>{component.name}</option>
    {/each}
  </select>
{/if}
{#if newFieldName && newFieldType}
  <button class="bg-green mt-4" on:click={addField}>Add Field</button>
{/if}
