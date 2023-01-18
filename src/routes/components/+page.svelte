<script lang="ts">
  export let data: import('./$types').PageData;
</script>

<main class="pane mt-8 container">
  <ul class="etched">
    {#each data.components as component}
      <a href={`/components/${component._id}`}><li class="p-4 odd:bg-black/10">{component.name}</li></a>
    {/each}
  </ul>
</main>