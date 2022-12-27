<script>
  import "../app.css"

  const links = [
    {
      title: 'Content Types',
      to: '/content-types',
    },
    {
      title: 'Content',
      to: '/content',
    },
  ]
</script>

<nav class="bg-slateGrey p-8">
  <h1 class="text-5xl">Nightfall CMS</h1>
  <ul class="flex gap-4 mt-4">
    {#each links as link}
      <li class="text-lg"><a href={link.to}>{link.title}</a></li>
    {/each}
  </ul>
</nav>

<slot />