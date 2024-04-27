<template>
  <div class="min-h-screen surface-ground">
    <AppBanner />
    <div class="my-5">
      <MovieList />
    </div>
  </div>
</template>

<script>
import AppBanner from '@/components/AppBanner.vue'
import MovieList from '@/components/MovieList.vue'
export default {
  components: {
    AppBanner,
    MovieList
  }
}
</script>
