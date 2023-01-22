<script lang="ts">
  import type { Block, IAttribute } from '$lib/types';
  import { onMount } from 'svelte';

  export let attribute: IAttribute;
  export let value: string | Record<string, Block> | undefined = undefined;

  let options: { _id: string; title: string }[] = [];

  onMount(async () => {
    const ids = attribute.value
      .split('::')
      .map((id) => id.split('__')[1])
      .join('::');
    options = await (await fetch('/content/?ids=' + ids)).json();
  });
</script>

<p>{attribute.key}</p>
<select bind:value>
  <option value="">Select Reference Content</option>
  {#each options as option}
    <option value={option._id}>{option.title}</option>
  {/each}
</select>
