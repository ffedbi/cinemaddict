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
		name: "watchlist",
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
				this.counter < this.watchList.length ? this.counter += this.step
					: this.counter += this.watchList.length % this.counter;

				this.counter >= this.watchList.length ? this.showBtnMore = false
					: false;
			}
		},
		computed: {
			watchList() {
				return this.$store.state.watchList;
			},
			getStartMovies() {
				const startStep = 0;
				return this.watchList.slice(startStep, this.counter);
			},
		}
	}
</script>

<style scoped>

</style>
