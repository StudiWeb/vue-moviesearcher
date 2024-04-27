import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state() {
    return {
      movie: null,
      movies: [],
      totalResults: null,
      movieListloading: false,
      movieDataLoading: false,
      apiKey: 'd187a970'
    }
  },
  actions: {
    loadMovies(title, page = 1) {
      console.log(page)
      if (title) {
        this.movieListloading = true
        fetch(`http://www.omdbapi.com/?s=${title}&page=${page}&apikey=${this.apiKey}`)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            this.movies = data.Search
            this.totalResults = data.totalResults
          })
          .finally(() => {
            this.movieListloading = false
          })
      }
    },
    loadMovieData(movieId) {
      this.movieDataLoading = true
      fetch(`http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=${this.apiKey}`)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.movie = data
        })
        .finally(() => {
          this.movieDataLoading = false
        })
    },

    reset() {
      this.movie = null
      this.movies = []
      this.totalResults = null
      this.movieListloading = false
      this.movieDataLoading = false
    }
  }
})
