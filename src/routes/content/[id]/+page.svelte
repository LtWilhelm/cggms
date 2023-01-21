<script lang="ts">
  import ContentEditor from "$lib/components/ContentEditor/ContentEditor.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  const { content, components, component } = data;
  export let form: ActionData;

  $: if (form?.success) {
    toast.push("Content Updated");
    setTimeout(() => {
      form = null;
    }, 3000);
  }
</script>

<ContentEditor
  {content}
  componentList={components}
  componentData={component || undefined}
/>
