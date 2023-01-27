<script lang="ts">
  import { enhance } from "$app/forms";
  import { getAttributes } from "$lib/typeAttributes";
  import type { IAttribute, IComponent, IMetadata } from "$lib/types";
  import AttributeEditor from "./AttributeEditor.svelte";

  export let data: {
    component?: IComponent;
    components?: Partial<IComponent>[];
  };

  const field: IAttribute<string, string | number | boolean> = {
    key: "",
    value: "",
    attributes: [],
  };

  let currentField: IAttribute<string, string | number | boolean> = {
    ...field,
  };

  let fields: IAttribute<string, string | number | boolean>[] = [
    ...(data.component?.attributes || []),
  ];
  let metadata: IMetadata[] =
    (data.component?.metatags as IMetadata[]) || [];

  let name = data.component?.name;

  const addField = () => {
    const index = fields.findIndex(f => f._id === currentField._id);
    if (index) {
      fields[index] = currentField;
    } else fields = [...fields, currentField];
    currentField = {
      ...field,
    };
  };

  const selectField = (field: IAttribute) => {
    currentField = { ...field };
    currentField.attributes = currentField.attributes?.concat(getAttributes(currentField.value).filter(
      a => !currentField.attributes?.some(ab => ab.key === a.key)
    ));
  };

  const checkType = (value: string) => value.split("__")[0];

  const handleType = (
    e: Event & {
      currentTarget: EventTarget & HTMLSelectElement;
    }
  ) => {
    currentField.value = e.currentTarget.value;
    currentField.attributes = getAttributes(currentField.value);
  };

  // $: currentField.attributes = getAttributes(currentField.value)

  let newMetadataKey: string;
  let newMetadataValue: string;
  const addTag = () => {
    metadata = [
      ...metadata,
      {
        key: newMetadataKey,
        value: newMetadataValue,
      },
    ];
    newMetadataKey = "";
    newMetadataValue = "";
  };
</script>

<div class="container mt-8 grid gap-8 grid-cols-3">
  <section class="pane grid gap-4 col-span-2">
    <h2 class="text-xl font-bold">Create New Component</h2>
    <label>
      <span>Component Name:</span>
      <input
        class="block mt-2 w-full"
        type="text"
        bind:value={name}
        placeholder="Name..."
      />
    </label>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <h2 class="text-lg font-bold">Add a field:</h2>
        <div class="flex gap-4 items-end">
          <label
            >Field Name: <input
              class="block mt-2"
              type="text"
              bind:value={currentField.key}
              placeholder="Name..."
            /></label
          >
          <select class="" value={checkType(currentField.value)} on:change={handleType}>
            <option value="">Field Type...</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="long">Long Form</option>
            <option value="boolean">Boolean</option>
            {#if data.components}
              <option value="reference">Reference</option>
              <option value="component">Component</option>
            {/if}
          </select>
        </div>
        {#if (currentField.value.startsWith("reference__") || currentField.value.startsWith("component__")) && data.components}
          <select class="mr-4" bind:value={currentField.value}>
            <option value={currentField.value.split("__")[0] + "__"}
              >Select component</option
            >
            {#each data.components as component}
              <option value={currentField.value.split("__")[0] + "__" + component._id}
                >{component.name}</option
              >
            {/each}
          </select>
        {/if}

        {#if currentField.key && currentField.value}
          <button class="bg-green mt-4" on:click={addField}>Add Field</button>
        {/if}
        <ul class="etched mt-4">
          {#each currentField.attributes || [] as attribute}
            <li class="p-4 odd:bg-black/10 flex gap-4 items-center">
              <AttributeEditor bind:attribute />
            </li>
          {/each}
        </ul>
      </div>

      <ul class="etched h-min">
        {#each fields as field}
          <li class="p-4 odd:bg-black/10 flex justify-between items-center">
            <div>
              <span>{field.key}</span>
              <span class="ml-2 text-gray-500">{checkType(field.value)}</span>
            </div>
            <span>
              <button on:click={() => selectField(field)} class="bg-green mr-2">
                Edit
              </button>
              <button
                on:click={() => (fields = fields.filter(f => f.key !== field.key))}
                class="bg-red-100">Delete</button
              >
            </span>
          </li>
        {/each}
      </ul>
    </div>
    <form method="POST" use:enhance>
      <input type="hidden" name="name" value={name} />
      {#each fields as field}
        <input type="hidden" name="attributes" value={JSON.stringify(field)} />
      {/each}
      <!-- <input
        type="hidden"
        name="attributes"
        value={fields.map(f => `${f.name}::${f.type}::${f.ref || ""}`).join(",")}
      /> -->
      {#each metadata as tag}
        <input type="hidden" name="metadata" value={JSON.stringify(tag)} />
      {/each}
      {#if fields.length && name}
        <button class="bg-green w-max mt-4">Save Component</button>
      {/if}
    </form>
  </section>
  <aside class="pane">
    <h2 class="text-xl font-bold">Metadata</h2>
    <div class="flex gap-4 w-full">
      <input
        class="basis-1/2 w-1/3"
        type="text"
        bind:value={newMetadataKey}
        placeholder="Key..."
      />
      <input
        class="basis-1/2 w-1/3"
        type="text"
        bind:value={newMetadataValue}
        placeholder="Value..."
      />
    </div>
    <button
      on:click={addTag}
      class="bg-green mt-4"
      disabled={!(newMetadataKey && newMetadataValue)}>Add Tag</button
    >
    <ul class="etched h-min mt-4">
      {#each metadata as tag}
        <li class="p-4 odd:bg-black/10 flex justify-between items-center">
          <span>{tag.key} : {tag.value}</span>
          <span>
            <!-- <button on:click={() => dispatch("delete", tag.key)} class="bg-green">Edit</button> -->
            <button
              on:click={() => (metadata = metadata.filter(t => t.key !== tag.key))}
              class="bg-red-100">Delete</button
            >
          </span>
        </li>
      {/each}
    </ul>
  </aside>
</div>
