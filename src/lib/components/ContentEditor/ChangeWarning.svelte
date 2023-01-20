<script lang="ts">
  import { clickOutside } from '$lib/actions/clickoutside';
  import { toast } from '@zerodevx/svelte-toast';

  export let onAccept: () => void;
  export let toastId: string;
  // export let onDecline: () => void;
  const onDecline = () => {
    toast.pop(toastId);
  };
</script>

<div
  class="p-4 rounded-lg bg-gray-700"
  use:clickOutside
  on:outclick={onDecline}
>
  <h1 class="text-lg font-extrabold text-red-0">WARNING</h1>

  <p class="mb-2">
    Changing the component will cause you to lose unsaved progress.
  </p>
  <p class="mb-2">
    Additionally, saving after changing components will overwrite any saved data
  </p>

  <p class="mb-2">Are you sure you would like to continue?</p>

  <button
    class="bg-green"
    on:click={() => {
      onAccept();
      toast.pop(toastId);
    }}>Yes, continue</button
  >
  <button class="bg-red-90 ml-4" on:click={onDecline}>No, cancel</button>
</div>
