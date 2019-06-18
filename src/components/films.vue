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
				return this.$store.state.movies;
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
