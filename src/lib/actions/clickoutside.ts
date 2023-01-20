import type { Action } from 'svelte/action'

export const clickOutside: Action<HTMLElement, { outclick: string }> = (node) => {
  const handleClick = (event: MouseEvent) => {
    if (event.target && !node.contains(event.target as unknown as Node)) {
      node.dispatchEvent(new CustomEvent("outclick"));
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    }
  };
}
