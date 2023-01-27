<script lang="ts">
  import { enhance } from "$app/forms";
  import { ComponentService } from "$lib/stores/ComponentStore";
  import { ContentReady, ContentService, ContentStore } from "$lib/stores/ContentStore";
  import type { Block, IComponent } from "$lib/types";
  import { stringify } from "postcss";
  import { onMount } from "svelte";
  import AttributeSelector from "./AttributeSelector.svelte";

  export let heritage: string[];
  export let componentId: string;
  let componentData: IComponent;

  let formEl: HTMLButtonElement;

  let values: Record<string, Block> = {};

  ContentService()
    .get(heritage.join("."))
    .then(v => {
      // console.log(v, heritage);
      if ((v as unknown as string) === "undefined") return (values = {});
      values = (v as Record<string, Block>) || {};
    });

  $: {
    if (typeof window !== "undefined" && componentData?._id !== componentId) {
      ComponentService()
        .get(componentId)
        .then(res => {
          if (res) {
            // ready = true;
            componentData = res;
          }
        });
    }
  }
  let timer: NodeJS.Timeout;
  // let init = true;
  let updates = 0;
  $: {
    values;
    debounce();
  }

  const debounce = () => {
    if (updates > 2) {
      $ContentReady[heritage.join(".")] = false;
      clearTimeout(timer);
      timer = setTimeout(() => {
        formEl?.click();
      }, 3000);
    } else {
      updates++;
    }
  };
</script>

{#if componentData}
  <div class="pl-4 border-l border-gray-100/10 flex flex-col gap-4">
    <p class="italic text-gray-100">{componentData?.name}</p>
    {#if componentData.metatags.find(t => t.key === "display" && t.value === "table")}
      <div class="overflow-x-auto m-w-full">
        <table>
          <thead>
            <tr>
              {#each componentData.attributes.filter(a => !a.value.startsWith("reference__") && !a.value.startsWith("component__")) as attribute}
                <th>{attribute.key}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            <tr>
              {#each componentData.attributes.filter(a => !a.value.startsWith("reference__") && !a.value.startsWith("component__")) as attribute}
                <td>
                  <AttributeSelector
                    {attribute}
                    {heritage}
                    bind:value={values[attribute._id || '']}
                  />
                </td>
              {/each}
            </tr>
          </tbody>
        </table>
      </div>
      {#each componentData.attributes.filter(a => a.value.startsWith("reference__") && a.value.startsWith("component__")) as attribute}
        <AttributeSelector {attribute} {heritage} bind:value={values[attribute._id || '']} />
      {/each}
    {:else}
      {#each componentData?.attributes || [] as attribute}
        <AttributeSelector {attribute} {heritage} bind:value={values[attribute._id || '']} />
      {/each}
    {/if}
    <form action="?/component" method="POST" use:enhance>
      <input type="hidden" name="heritage" value={heritage.join(".")} />
      {#each Object.entries(values) as [name, value]}
        {#if typeof value !== "object"}
          <input type="hidden" {name} {value} />
        {:else}
          <input type="hidden" {name} value={JSON.stringify(value)} />
        {/if}
      {/each}
      <button bind:this={formEl} class="hidden" type="submit" />
    </form>
  </div>
{/if}
