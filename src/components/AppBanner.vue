<template>
  <div class="app-banner">
    <div
      class="p-3 my-6 border-1 border-round text-center"
      style="background-color: rgba(18, 18, 18, 0.25)"
    >
      <div class="text-6xl text-white font-bold mb-1">Search for your movie</div>
      <div class="text-6xl text-primary font-bold mb-4">and learn about it more!</div>
      <p class="mt-0 mb-4 line-height-3 text-center mx-auto text-white" style="max-width: 500px">
        <span class="underline">Moviesearcher</span> app allows you to search for thousand and
        thousand movies from all over the world.
      </p>
      <a href="https://github.com/StudiWeb/vue-moviesearcher" target="_blank" rel="noopener">
        <Button class="p-button p-component" icon="pi pi-github" label="Github" />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-banner {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-image: url('@/assets/images/banner.jpg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
