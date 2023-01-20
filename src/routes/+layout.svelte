<script>
  import '../app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  const links = [
    {
      title: 'Components',
      to: '/components',
    },
    {
      title: 'Content',
      to: '/content',
    },
  ];

  const toastOptions = {
    theme: {
      '--toastBackground': 'transparent',
    },
    classes: ['bg-grizzly-90', 'rounded-md'],
  };
</script>

<!-- TODO - custom toasts, this one is too restricted -->
<SvelteToast options={toastOptions} />
<div class="wrap">
  <SvelteToast
    target="center"
    options={{ initial: 0, intro: { y: -64 }, ...toastOptions }}
  />
</div>

<nav class="pane p-8 container">
  <h1 class="text-5xl font-extrabold">CyborgGrizzly Game System Manager</h1>
  <ul class="flex mt-4">
    {#each links as link}
      <li
        class="text-lg after:content-[''] after:mx-4 after:border-l-2 last:after:content-[]"
      >
        <a href={link.to}>{link.title}</a>
      </li>
    {/each}
  </ul>
</nav>

<slot />

<style>
  .wrap {
    --toastContainerTop: 0.5rem;
    --toastContainerRight: 0.5rem;
    --toastContainerBottom: auto;
    --toastContainerLeft: 0.5rem;
    --toastWidth: 100%;
    --toastMinHeight: 2rem;
    --toastPadding: 0 0.5rem;
    font-size: 0.875rem;
  }
  @media (min-width: 40rem) {
    .wrap {
      --toastContainerRight: auto;
      --toastContainerLeft: calc(50vw - 20rem);
      --toastWidth: 40rem;
    }
  }
</style>