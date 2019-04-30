<template lang="pug">
	section.films
		section.films-list
			h2.films-list__title.visually-hidden All movies. Upcoming
			.films-list__container
				film-card(v-for="(item, index) in getStartMovies" :film-data="item" film-group="extra" :key="index")
			button(v-if="showBtnMore" type="button" @click="onClickBtnMore").films-list__show-more Show more
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
	import {mapGetters} from 'vuex';
	import FilmCard from "./film-card";

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
			...mapGetters([
				'movies'
			]),
			getStartMovies() {
				const startStep = 0;
				return this.movies.slice(startStep, this.counter);
			},
			getTopRatedMovies() {
				let arrMovies = this.movies.slice();
				return arrMovies.sort((a, b) => b.film_info.total_rating - a.film_info.total_rating).slice(0, 2)
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
