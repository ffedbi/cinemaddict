<template lang="pug">
	section.films
		section.films-list
			h2.films-list__title.visually-hidden All movies. Upcoming
			.films-list__container
				film-card(v-for="(item, index) in movies" :film-data="item" :key="index")
			button(type="button").films-list__show-more Show more
		section.films-list--extra
			h2.films-list__title Top rated
			.films-list__container
				film-card(v-for="(item, index) in movies" :film-data="item" :key="index")
		section.films-list--extra
			h2.films-list__title Most comment
			.films-list__container
				film-card(v-for="(item, index) in movies" :film-data="item" :key="index")
</template>

<script>
	import {mapState} from 'vuex';
	import FilmCard from "./film-card";

	export default {
		name: "films",
		components: {FilmCard},
		data() {
			return {}
		},
		computed: {
			...mapState(['movies'])
		}
	}
</script>

<style scoped>

</style>
