<script lang="ts">
  import ContentEditor from "$lib/components/ContentEditor/ContentEditor.svelte";
  import { ContentReady } from '$lib/stores/ContentStore';
  import { toast } from "@zerodevx/svelte-toast";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  const { content, components, component } = data;
  export let form: ActionData;

  $: if (form && form?.success && typeof form.component === 'boolean') {
    toast.push("Content Updated");
    setTimeout(() => {
      form = null;
    }, 3000);
  }

  $: if (form?.component && typeof form.component === 'string') {
    console.log('hit');
    $ContentReady[form.component] = true;
  }
</script>

<ContentEditor
  {content}
  componentList={components}
  componentData={component || undefined}
/>
