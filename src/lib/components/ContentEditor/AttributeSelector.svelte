<script lang="ts">
  import type { Block, IAttribute } from "$lib/types";
  import ComponentContent from "./ComponentContent.svelte";
  import Field from "./Field.svelte";
  import ReferenceSelector from "./ReferenceSelector.svelte";

  type Value = Block | Record<string, Block>;

  export let attribute: IAttribute<string, string | number | boolean>;
  export let value: Value | Value[] | undefined = undefined;
  if (value === "undefined") console.log(attribute);
  export let heritage: string[] = [];
  const heritageId = attribute._id || "";

  let limit = 1;
  if (attribute.attributes?.find(a => a.key === "limit" && a.value !== 1)) {
    limit = attribute.attributes.find(a => a.key === "limit")?.value as number;

    if (value && !Array.isArray(value)) value = [value];
    else value = [
      attribute.value.startsWith('component__') ||
      attribute.value.startsWith('reference__') ||
      attribute.value === 'string' ||
      attribute.value === 'long' ?
        '' :
        1
    ]
  }

  const addValue = () => {
    if (Array.isArray(value)) {
      value.push(
        attribute.value.startsWith('component__') ||
        attribute.value.startsWith('reference__') ||
        attribute.value === 'string' ||
        attribute.value === 'long' ?
          '' :
          1
      );
      value = value;
    }
  }
</script>

{#if limit === 1}
  {#if attribute.value.startsWith("component__")}
    <ComponentContent
      componentId={attribute.value.split("__")[1]}
      heritage={[...heritage, heritageId]}
    />
  {:else if attribute.value.startsWith("reference__") && !(Array.isArray(value) || typeof value === "number")}
    <ReferenceSelector {attribute} bind:value />
  {:else if attribute.value === "long"}
    <div>Hello, am long text</div>
  {:else if typeof value === "string" || typeof value === "number" || typeof value === "undefined" || typeof value === "boolean"}
    <Field type={attribute.value} placeholder={attribute.key} bind:value />
  {/if}
{:else if Array.isArray(value)}
  {#each value as val}
    {#if attribute.value.startsWith("component__")}
      <ComponentContent
        componentId={attribute.value.split("__")[1]}
        heritage={[...heritage, heritageId]}
      />
    {:else if attribute.value.startsWith("reference__") && !(Array.isArray(val) || typeof val === "number")}
      <ReferenceSelector {attribute} bind:value={val} />
    {:else if attribute.value === "long"}
      <div>Hello, am long text</div>
    {:else if typeof val === "string" || typeof val === "number" || typeof val === "undefined" || typeof val === "boolean"}
      <Field type={attribute.value} placeholder={attribute.key} bind:value={val} />
    {/if}
  {/each}
  {#if !limit || value.length < limit}
    <button on:click={addValue} class="bg-green">Add Value</button>
  {/if}
{/if}
