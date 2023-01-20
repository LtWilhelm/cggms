<script lang="ts">
  import { ComponentService } from '$lib/stores/ComponentStore';
  import type { IComponent, IContent } from '$lib/types';
  import { toast } from '@zerodevx/svelte-toast';
  import AttributeSelector from './AttributeSelector.svelte';
  import ChangeWarning from './ChangeWarning.svelte';

  export let content: Partial<IContent>;
  export let componentList: Partial<IComponent>[];

  let title = content.title;
  let componentId = content.component;
  export let componentData: IComponent | undefined = undefined;

  $: {
    if (typeof window !== 'undefined' && componentData?._id !== componentId)
    // console.log('requesting... for some reason');
      ComponentService()
        .get(componentId)
        .then((res) => res && (componentData = res));
  }

  const changeComponent = () => {
    toast.push({
      component: {
        src: ChangeWarning,
        props: {
          onAccept: () => {
            componentData = undefined;
          },
        },
        sendIdTo: 'toastId',
      },
      initial: 0,
      dismissable: false,
      theme: {
        '--toastPadding': '0',
        '--toastMsgPadding': '0',
      },
      target: 'center',
    });
  };
</script>

<main class="pane container mt-8">
  {#if !componentData}
    <select class="mr-4" bind:value={componentId}>
      <option value="">Select component</option>
      {#each componentList as component}
        <option value={component._id}>{component.name}</option>
      {/each}
    </select>
  {:else}
  <p class="italic text-gray-100">Editing <span class="not-italic">{componentData.name}</span> - {title || 'untitled'}</p>
    <button on:click={changeComponent}>Change component</button>
  {/if}
  <pre>{JSON.stringify(componentData, null, 2)}</pre>
  {#each componentData?.attributes || [] as attribute}
    <AttributeSelector {attribute} />
  {/each}
</main>
