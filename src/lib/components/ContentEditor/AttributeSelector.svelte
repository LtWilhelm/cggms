<script lang="ts">
  import type { Block, IAttribute } from "$lib/types";
  import ComponentContent from "./ComponentContent.svelte";
  import Field from "./Field.svelte";
  import ReferenceSelector from "./ReferenceSelector.svelte";

  export let attribute: IAttribute;
  export let value: Block | Record<string, Block> | undefined = undefined;
  if (value === 'undefined')console.log(attribute);
  export let heritage: string[] = [];
  const heritageId = attribute._id || '';
</script>

{#if attribute.value.startsWith("component__")}
  <ComponentContent
    componentId={attribute.value.split("__")[1]}
    heritage={[...heritage, heritageId]}
  />
{:else if attribute.value.startsWith("reference__") && !(Array.isArray(value) || typeof value === "number")}
  <ReferenceSelector {attribute} bind:value={value} />
{:else if attribute.value === "long"}
  <div>Hello, am long text</div>
{:else if typeof value === "string" || typeof value === "number" || typeof value === "undefined"}
  <Field type={attribute.value} placeholder={attribute.key} bind:value />
{/if}
