<template lang="pug">
	section.films-list
		h2.films-list__title.visually-hidden All movies. Upcoming
		.films-list__container
			film-card(v-for="(item, index) in getStartMovies" :film-data="item" film-group="extra" :key="index")
		button(v-if="showBtnMore" type="button" @click="onClickBtnMore").films-list__show-more Show more
</template>

<script>
	import FilmCard from '../film-card'

	export default {
		name: "all",
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
		}
	}
</script>

<style scoped>

</style>
