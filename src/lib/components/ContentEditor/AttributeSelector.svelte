<script lang="ts">
  import type { IAttribute } from '$lib/types';
  import Field from './Field.svelte';

  export let attribute: IAttribute;
  export let value: string | number | (string | number)[] | undefined = undefined;

  let component = Field;

  // if (attribute.key.startsWith('component__'))
  //   component = 

</script>

{#if attribute.value.startsWith('component__')}
<div>Hello, am component</div>
{:else if attribute.value.startsWith('ref__')}
<div>Hello, am ref</div>
{:else if attribute.value === 'long'}
  <div>Hello, am long text</div>
{:else if typeof value === 'string' || typeof value === 'number' || typeof value === 'undefined'}
  <Field type={attribute.value} placeholder={attribute.key} bind:value={value} />
{/if}

