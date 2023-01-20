<script lang="ts">
  import ContentEditor from "$lib/components/ContentEditor/ContentEditor.svelte";

  export let data: import('./$types').PageData;
  const {content, components, component} = data;
</script>

<ContentEditor {content} componentList={components} componentData={component || undefined} />
