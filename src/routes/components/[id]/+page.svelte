<script lang="ts">
  import ComponentEditor from "$lib/components/ComponentEditor.svelte";
    import type { ActionData, PageData } from './$types';

  export let data: PageData;
  export let form: ActionData;

  if (form?.success) {
    setTimeout(() => {
      form = undefined;
    }, 3000)
  }
</script>

{#if form?.success}
  <div class="pane container mt-8">
    Component saved successfully
  </div>
{/if}

<ComponentEditor {data} />
