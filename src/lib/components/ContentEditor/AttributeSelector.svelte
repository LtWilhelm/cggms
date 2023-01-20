<script lang="ts">
  import type { IAttribute } from '$lib/types';
  import Field from './Field.svelte';

  export let attribute: IAttribute;
  // export let value: string | number;
</script>

{#if attribute.key.startsWith('component__')}
<div>Hello, am component</div>
{:else if attribute.key.startsWith('ref__')}
<div>Hello, am ref</div>
{:else if attribute.value === 'long'}
  <div>Hello, am long text</div>
{:else}
  <Field type={attribute.value} placeholder={attribute.key} />
{/if}
