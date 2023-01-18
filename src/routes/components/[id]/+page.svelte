<script lang="ts">
  import ComponentEditor from "$lib/components/ComponentEditor.svelte";
    import { toast } from '@zerodevx/svelte-toast';
    import type { ActionData, PageData } from './$types';

  export let data: PageData;
  export let form: ActionData;

  if (form?.success) {
    toast.push("Component Updated")
    setTimeout(() => {
      form = null;
    }, 3000)
  }
</script>

<ComponentEditor {data} />
