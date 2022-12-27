<script lang="ts">
  let fields: import("$lib/types").IField[] = [];

  let name: string;

  let newFieldName: string;
  let newFieldType: "string" | "number" | "boolean" | "reference" | "content" | '';
  let newFieldRef: string;

  export let data: any;

  const addField = () => {
    fields = [...fields, {
      name: newFieldName,
      type: newFieldType as "string" | "number" | "boolean" | "reference" | "content"
    }];
    newFieldName = '';
    newFieldType='';
  }
</script>

<div class="container mt-4 grid gap-8 grid-cols-3">
  <section class="grid gap-4 col-span-2">
    <h2 class="text-xl font-bold">Create New Content Type</h2>
    <label
      >Type Name:<input
        class="block mt-2 w-full"
        type="text"
        bind:value={name}
        placeholder="Name..."
      /></label
    >

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
            <option value="reference">Reference</option>
          </select>
        </div>
        {#if newFieldType === "reference"}
          <select class="" bind:value={newFieldType}>
            {#each data.content as content}
              <option value={content.id}>{content.title}</option>
            {/each}
          </select>
        {/if}
        {#if newFieldName && newFieldType}
          <button class="green" on:click={addField}>Add Field</button>
        {/if}
      </div>
      <ul>
        {#each fields as field}
          <li>{field.name}</li>
        {/each}
      </ul>
    </div>
  </section>
  <aside>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam commodi
    corrupti quo consectetur deleniti vel minus enim iste possimus suscipit
    cumque incidunt omnis recusandae architecto ratione, cupiditate consequuntur
    inventore harum?
  </aside>
</div>
