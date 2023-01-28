<script lang="ts">
  import type { IAttribute } from "$lib/types";
  import { createEventDispatcher, type SvelteComponent } from "svelte";

  export let values: IAttribute[];

  let indexToSet = -1;
  let indexToMoveTo = -1;
  let dragging = false;

  const onDragStart = (index: number) => {
    indexToSet = index;
    dragging = true;
    console.log(dragging);
  };

  const onDragEnter = (index: number) => {
    indexToMoveTo = index;
  };

  const onDragEnd = () => {
    if (indexToMoveTo === -1) indexToSet = -1;
    dragging = false;
  };

  const onDragLeave = () => {
    indexToMoveTo = -1;
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    if (!(indexToMoveTo > -1 && indexToSet > -1)) return;
    let temp: (IAttribute | null)[] = [...values];
    const item = values[indexToSet];
    temp[indexToSet] = null;
    temp = [...temp.slice(0, indexToMoveTo), item, ...temp.slice(indexToMoveTo)];
    // values.splice(indexToSet < indexToMoveTo ? indexToSet - 1 : indexToSet, 1);
    values = temp.filter(a => a != null) as IAttribute[];
  };

  const dragover = (ev: DragEvent) => {
    ev.preventDefault();
    ev.dataTransfer!.dropEffect = "move";
  };

  const checkType = (value: string) => value.split("__")[0];
  const dispatch = createEventDispatcher<{ select: IAttribute }>();
  const selectField = (field: IAttribute) => {
    dispatch("select", field);
  };
</script>

<ul class="etched rounded-lg">
  {#each values as field, index}
    <li class="relative p-4 pl-0 odd:bg-black/10 flex gap-4">
      <span
        class="p-2 bg-white/10 cursor-move rounded-r-lg"
        draggable="true"
        on:dragstart={() => onDragStart(index)}
        on:dragend={onDragEnd}>⣿</span
      >
      <div class="flex items-center justify-between flex-grow">
        <div>
          <span>{field.key}</span>
          <span class="ml-2 text-gray-500">{checkType(field.value)}</span>
        </div>
        <span>
          <button on:click={() => selectField(field)} class="bg-green mr-2">
            Edit
          </button>
          <button
            on:click={() => (values = values.filter(f => f.key !== field.key))}
            class="bg-red-100">Delete</button
          >
        </span>
      </div>
      <div
        on:dragover={dragover}
        data-dragging={dragging}
        data-targeted={indexToMoveTo === index}
        class="h-4 w-full absolute rounded-md -top-2 border-white/10 data-[targeted=true]:border-white border-0 data-[dragging=true]:border-2 transition-all"
        on:dragenter={() => onDragEnter(index)}
        on:dragleave={onDragLeave}
        on:drop={onDrop}
      />
      {#if index === values.length - 1}
        <div
          on:dragover={dragover}
          data-dragging={dragging}
          data-targeted={indexToMoveTo === index + 1}
          class="h-4 w-full absolute rounded-md -bottom-2 border-white/10 data-[targeted=true]:border-white border-0 data-[dragging=true]:border-2 transition-all"
          on:dragenter={() => onDragEnter(index + 1)}
          on:dragleave={onDragLeave}
          on:drop={onDrop}
        />
      {/if}
    </li>
  {/each}
</ul>
