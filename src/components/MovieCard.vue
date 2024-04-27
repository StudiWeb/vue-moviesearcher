<template>
  <div @mouseenter="mouseOnCard = true" @mouseleave="mouseOnCard = false">
    <div
      class="app-movie-card h-24rem bg-contain bg-center bg-no-repeat grayscale-animation"
      :class="{ 'grayscale-0': mouseOnCard, 'grayscale-80': !mouseOnCard }"
      :style="{ backgroundImage: `url(${poster})` }"
    >
      <div class="h-full flex justify-content-center">
        <Button
          v-if="mouseOnCard"
          @click="openDialog"
          class="align-self-center"
          icon="pi pi-search"
          rounded
          aria-label="Search"
        />
      </div>
    </div>
    <div @click="openDialog" class="p-1 cursor-pointer underline text-center">{{ title }}</div>
  </div>

  <Dialog v-model:visible="isDialogVisible" modal :style="{ width: '50vw' }">
    <template #header>
      <div class="flex gap-2 justify-content-between align-items-center">
        <span class="text-lg font-medium">{{ title }}</span>
        <ProgressSpinner
          v-if="movieDataLoading"
          style="width: 40px; height: 40px"
          strokeWidth="4"
          fill="var(--surface-ground)"
          animationDuration="1s"
          aria-label="Custom ProgressSpinner"
        />
      </div>
    </template>
    <div class="flex">
      <div v-if="!movieDataLoading && movie">
        <div class="flex gap-4">
          <img class="h-10rem" :src="poster" :alt="title" />
          <div class="flex flex-column gap-1">
            <div class="flex gap-2">
              <span class="font-medium">Released:</span>
              <span>{{ movie.Released }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-medium">Rating:</span>
              <Rating :modelValue="movie.imdbRating" :cancel="false" />
            </div>
            <div class="flex gap-2">
              <span class="font-medium">Genre:</span>
              <span>{{ movie.Genre }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-medium">Box office:</span>
              <span>{{ movie.BoxOffice }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-medium">Runtime:</span>
              <span>{{ movie.Runtime }}</span>
            </div>
          </div>
        </div>
        <div>
          <p>{{ movie.Plot }}</p>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Close" outlined @click="closeDialog" />
    </template>
  </Dialog>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useMoviesStore } from '@/stores/movies'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    poster: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      mouseOnCard: false,
      isDialogVisible: false
    }
  },

  computed: {
    ...mapState(useMoviesStore, ['movie']),
    ...mapState(useMoviesStore, ['movies']),
    ...mapState(useMoviesStore, ['movieDataLoading'])
  },

  methods: {
    ...mapActions(useMoviesStore, ['loadMovieData']),

    openDialog() {
      this.isDialogVisible = true
      this.loadMovieData(this.id)
    },

    closeDialog() {
      this.isDialogVisible = false
    }
  }
}
</script>

<style scoped>
.grayscale-0 {
  filter: grayscale(0);
}

.grayscale-80 {
  filter: grayscale(80%);
}

.grayscale-animation {
  transition-property: filter;
  transition-duration: 0.5s;
  transition-delay: 0.1s;
}
</style>
