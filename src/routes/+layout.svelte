<script>
  import "../app.css"

  const links = [
    {
      title: 'Components',
      to: '/components',
    },
    {
      title: 'Content',
      to: '/content',
    },
  ]
</script>

<nav class="pane p-8 container">
  <h1 class="text-5xl">Nightfall CMS</h1>
  <ul class="flex mt-4">
    {#each links as link}
      <li class="text-lg after:content-[''] after:mx-4 after:border-l-2 last:after:content-[]"><a href={link.to}>{link.title}</a></li>
    {/each}
  </ul>
</nav>

<slot />