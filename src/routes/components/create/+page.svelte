<script lang="ts">
  import ComponentEditor from "$lib/components/ComponentEditor.svelte";
    import type { ActionData, PageData } from './$types';

  export let data: PageData;
</script>

<ComponentEditor {data} />
