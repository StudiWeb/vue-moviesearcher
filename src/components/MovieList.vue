<template>
  <div :class="{ 'w-full absolute top-0 min-h-screen p-6 surface-ground': inputFocused }">
    <Button
      class="mb-4"
      @click="closeMovieListDialog"
      v-if="inputFocused"
      icon="pi pi-times"
      rounded
      outlined
      aria-label="Cancel"
    />
    <div class="flex justify-content-center">
      <div class="w-full flex flex-column align-items-center">
        <div class="text-4xl font-bold text-center mb-2">Search for your movie</div>
        <InputText
          @focus="openMovieListDialog"
          class="w-10 md:w-8 lg:w-6 xl:w-4 my-2"
          type="text"
          v-model="title"
          variant="filled"
        />
      </div>
    </div>
    <div>
      <div v-if="movieListloading" class="app-film-list">
        <Skeleton height="24rem" class="mt-6" v-for="placeholder in 10"></Skeleton>
      </div>
      <div v-else>
        <div v-if="Array.isArray(movies) && movies.length > 0">
          <p>We found for you {{ totalResults }} results</p>
          <div class="app-film-list">
            <MovieCard
              v-for="movie in movies"
              :key="movie.imdbID"
              :id="movie.imdbID"
              :title="movie.Title"
              :poster="
                movie.Poster && movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://fakeimg.pl/300x450?text=no+image'
              "
            />
          </div>
          <Paginator
            class="mt-4"
            @page="loadMoreMovies"
            v-model:first="first"
            :rows="10"
            :totalRecords="totalResults"
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          ></Paginator>
        </div>
        <div v-else-if="title" class="app-film-list">
          <Skeleton height="24rem" class="mt-6" v-for="placeholder in 10"></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useMoviesStore } from '@/stores/movies'
import MovieCard from './MovieCard.vue'
export default {
  components: { MovieCard },
  data() {
    return {
      first: null,
      title: '',
      inputFocused: false
    }
  },
  computed: {
    ...mapState(useMoviesStore, ['movies']),
    ...mapState(useMoviesStore, ['totalResults']),
    ...mapState(useMoviesStore, ['movieListloading'])
  },
  watch: {
    title(value) {
      this.loadMovies(value)
    }
  },
  methods: {
    ...mapActions(useMoviesStore, ['loadMovieData']),
    ...mapActions(useMoviesStore, ['loadMovies']),
    ...mapActions(useMoviesStore, ['reset']),
    loadMoreMovies(e) {
      this.loadMovies(this.title, e.page + 1)
    },
    openMovieListDialog() {
      this.inputFocused = true
    },
    closeMovieListDialog() {
      this.inputFocused = false
      this.title = ''
      this.first = null
      this.reset()
    }
  }
}
</script>

<style scoped lang="scss">
.app-film-list {
  display: grid;
  row-gap: 4rem;
  column-gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 768px) and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
