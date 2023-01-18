<script lang="ts">
  import FieldList from "$lib/components/FieldList.svelte";
  import TagList from "$lib/components/TagList.svelte";
  import type { fieldTypes, IComponent, IMetadata } from "$lib/types";

  export let data: {
    component?: IComponent;
    components?: Partial<IComponent>[];
  };

  let fields: import("$lib/types").IField[] =
    data.component?.attributes.map((a: IMetadata) => {
      let type = a.value! as string;
      let ref;
      if (type.startsWith("ref__")) {
        type = "reference";
        ref = type.split("__")[1];
      }
      return { name: a.key!, type: type as fieldTypes, ref: ref || "" };
    }) || [];
  let metadata: import("$lib/types").IMetadata[] =
    (data.component?.metatags as IMetadata[]) || [];

  let name = data.component?.name;

  let newFieldName: string;
  let newFieldType: fieldTypes;
  let newFieldRef: string;

  const addField = () => {
    fields = [
      ...fields,
      {
        name: newFieldName,
        type: newFieldType,
        ref: newFieldRef,
      },
    ];
    newFieldName = "";
    newFieldType = "";
    newFieldRef = "";
  };

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
      <span>Type Name:</span>
      <input
        class="block mt-2 w-full"
        type="text"
        bind:value={name}
        placeholder="Name..."
      />
    </label>

    <div class="grid grid-cols-2">
      <div>
        <h2 class="text-lg font-bold">Add a field:</h2>
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
            {#if data.components}
              <option value="reference">Reference</option>
              <option value="component">Component</option>
            {/if}
          </select>
        </div>
        {#if (newFieldType === "reference" || newFieldType === "component") && data.components}
          <select class="mr-4" bind:value={newFieldRef}>
            <option>Select component</option>
            {#each data.components as component}
              <option value={component._id}>{component.name}</option>
            {/each}
          </select>
        {/if}
        {#if newFieldName && newFieldType}
          <button class="bg-green mt-4" on:click={addField}>Add Field</button>
        {/if}
      </div>

      <ul class="etched h-min">
        {#each fields as field}
          <li class="p-4 odd:bg-black/10 flex justify-between items-center">
            <div>
              <span>{field.name}</span>
              <span class="ml-2 text-gray-500"
                >{field.type === "reference"
                  ? `Ref: ${
                      data.components?.find((c) => c._id === field.ref)?.name
                    }`
                  : field.type === "component"
                  ? `Comp: ${
                      data.components?.find((c) => c._id === field.ref)?.name
                    }`
                  : field.type}</span
              >
            </div>
            <button
              on:click={() =>
                (fields = fields.filter((f) => f.name !== field.name))}
              class="bg-red-100">Delete</button
            >
          </li>
        {/each}
      </ul>
    </div>
    <form method="POST">
      <input type="hidden" name="name" value={name} />
      <input
        type="hidden"
        name="attributes"
        value={fields
          .map((f) => `${f.name}::${f.type}::${f.ref || ""}`)
          .join(",")}
      />
      <input
        type="hidden"
        name="metadata"
        value={metadata.map((f) => `${f.key}::${f.value}`).join(",")}
      />
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
      <button on:click={addTag} class="bg-green mt-4" disabled={!(newMetadataKey && newMetadataValue)}>Add Tag</button>
    <ul class="etched h-min mt-4">
      {#each metadata as tag}
        <li class="p-4 odd:bg-black/10 flex justify-between items-center">
          <span>{tag.key} : {tag.value}</span>
          <span>
            <!-- <button on:click={() => dispatch("delete", tag.key)} class="bg-green">Edit</button> -->
            <button on:click={() => metadata = metadata.filter(t => t.key === tag.key)} class="bg-red-100">Delete</button>
          </span>
        </li>
      {/each}
    </ul>
  </aside>
</div>
