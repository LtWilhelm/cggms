<script lang="ts">
  import { enhance } from "$app/forms";
  import { ComponentService } from "$lib/stores/ComponentStore";
  import type { IComponent, IContent } from "$lib/types";
  import { toast } from "@zerodevx/svelte-toast";
  import AttributeSelector from "./AttributeSelector.svelte";
  import ChangeWarning from "./ChangeWarning.svelte";

  export let content: Partial<IContent>;
  export let componentList: Partial<IComponent>[];

  let title = content.title;
  let componentId = content.component;
  export let componentData: IComponent | undefined = undefined;

  // const values: Record<string, string | number | (string | number)[]> = {...content};

  $: {
    if (typeof window !== "undefined" && componentData?._id !== componentId)
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
            componentId = undefined;
          },
        },
        sendIdTo: "toastId",
      },
      initial: 0,
      dismissable: false,
      theme: {
        "--toastPadding": "0",
        "--toastMsgPadding": "0",
      },
      target: "center",
    });
  };
</script>

<main class="pane container mt-8 flex flex-col gap-4">
  <div class="etched p-4">
    {#if !componentData}
      <select class="mr-4" bind:value={componentId}>
        <option value="">Select component</option>
        {#each componentList as component}
          <option value={component._id}>{component.name}</option>
        {/each}
      </select>
    {:else}
      <p class="italic text-gray-100">
        Editing <span class="not-italic">{componentData.name}</span> - {title ||
          "untitled"}
      </p>
      <button on:click={changeComponent}>Change component</button>
    {/if}
    <pre>{JSON.stringify(componentData, null, 2)}</pre>
  </div>
  <div class="etched p-4">
    <label>
      <h3 class="font-bold text-lg">Content Title</h3>
      <input type="text" bind:value={title} placeholder="Title" />
    </label>
  </div>
  {#each componentData?.attributes || [] as attribute}
    <div class="etched p-4">
      <h3 class="font-bold text-lg">{attribute.key}</h3>
      <AttributeSelector {attribute} bind:value={content[attribute._id]} />
    </div>
  {/each}
  <form method="POST" use:enhance>
    <input type="hidden" name="title" value={title} />
    <input type="hidden" name="component" value={componentId} />
    {#each componentData?.attributes.filter((a) => !a.key.startsWith("component__")) || [] as attribute}
      <!-- {#if Array.isArray(values[attribute._id])}
      {#each values[attribute._id] as value}
      <input type="hidden" name={attribute._id} value={JSON.stringify(values[attribute._id])} />
        
      {/each}
        {:else}
        {/if} -->
      <input
        type="hidden"
        name={attribute._id}
        value={JSON.stringify(content[attribute._id])}
      />
    {/each}
    <button class="bg-green" type="submit" disabled={!(title && componentId)}
      >Save {title || "untitled"}</button
    >
  </form>
</main>
