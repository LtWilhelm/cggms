<script lang="ts">
  import type { IField, IMetadata } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  export let metatags: IMetadata[];

  const dispatch = createEventDispatcher();
</script>

<ul class="etched h-min">
  {#each metatags as tag}
    <li class="p-4 odd:bg-black/10 flex justify-between items-center">
      <span>{tag.key} : {tag.value}</span>
      <span>
        <!-- <button on:click={() => dispatch("delete", tag.key)} class="bg-green">Edit</button> -->
        <button on:click={() => dispatch("delete", tag.key)} class="bg-red-100">Delete</button>
      </span>
    </li>
  {/each}
</ul>
