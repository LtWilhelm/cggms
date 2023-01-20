<script lang="ts">
  export let value: string | number = '';

  export let type: 'string' | 'number' | string = 'string';
  export let placeholder: string | undefined = undefined;
  const normalizeType = (node: HTMLInputElement) => {
    switch (type) {
      case 'string':
        node.type = 'text';
        break;
      default:
        node.type = type || 'text';
    }
  };
</script>

<input use:normalizeType bind:value {placeholder} />
