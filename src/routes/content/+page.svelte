<script lang="ts">
    import type { PageData } from './$types';


  export let data: PageData;
</script>

<main class="container pane mt-8">
  <form method="POST">
    <button type="submit" class="bg-grizzly-0 mb-4">Create New Content</button>
  </form>
  <ul class="etched">
    {#each data.content as content}
      <a href={`/content/${content._id}`}>
        <li class="p-4">{content.title}</li>
      </a>
    {/each}
  </ul>
</main>
