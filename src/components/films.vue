<template lang="pug">
	section.films
		router-view
		section.films-list--extra
			h2.films-list__title Top rated
			.films-list__container
				film-card(v-for="(item, index) in getTopRatedMovies" :film-data="item" :key="index")
		section.films-list--extra
			h2.films-list__title Most comment
			.films-list__container
				film-card(v-for="(item, index) in getMaxCommentMovies" :film-data="item" :key="index")
</template>

<script>
  import FilmCard from './film-card'
  import moment from 'moment';

	export default {
		name: "films",
		components: {FilmCard},
		data() {
			return {
				counter: 5,
				step: 5,
				showBtnMore: true,
			}
		},
		methods: {
			onClickBtnMore() {
				this.counter < this.movies.length ? this.counter += this.step
					: this.counter += this.movies.length % this.counter;

				this.counter >= this.movies.length ? this.showBtnMore = false
					: false;
			}
		},
		computed: {
			movies() {
        const movies = this.$store.state.movies

        const dateStartYear = moment().startOf('year').valueOf();
        const dateEndYear = moment().endOf('year').valueOf();

        const movieInYaer = movies.slice().filter((movie) => {
           if (movie.userDetails.watchingDate > dateStartYear && movie.userDetails.watchingDate < dateEndYear) {
             return movie;
           }
        });

        const dateStarMouth = moment().startOf('month').valueOf();
        const dateEndMouth = moment().endOf('mouth').valueOf();

        const movieInMouth = movies.slice().filter((movie) => {
           if (movie.userDetails.watchingDate > dateStarMouth && movie.userDetails.watchingDate < dateEndMouth) {
             return movie;
           }
        });

        const dateStartWeek = moment().startOf('week').valueOf();
        const dateEndWeek = moment().endOf('week').valueOf();

        const movieInWeek = movies.slice().filter((movie) => {
           if (movie.userDetails.watchingDate > dateStartWeek && movie.userDetails.watchingDate < dateEndWeek) {
             return movie;
           }
        });

        const dateStartDay = moment().startOf('day').valueOf();
        const dateEndDay = moment().endOf('day').valueOf();

        const movieInDay = movies.slice().filter((movie) => {
           if (movie.userDetails.watchingDate > dateStartDay && movie.userDetails.watchingDate < dateEndDay) {
             return movie;
           }
        });

				return movies;
			},
			getStartMovies() {
				const startStep = 0;
				return this.movies.slice(startStep, this.counter);
			},
			getTopRatedMovies() {
				let arrMovies = this.movies.slice();
				return arrMovies.sort((a, b) => b.info.rating - a.info.rating).slice(0, 2)
			},
			getMaxCommentMovies() {
				let arrMovies = this.movies.slice();
				return arrMovies.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2)
			},
		},
	}
</script>

<style scoped>

</style>
