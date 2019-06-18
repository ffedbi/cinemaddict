<template lang="pug">
	section.films-list
		h2.films-list__title.visually-hidden All movies. Upcoming
		.films-list__container
			film-card(v-for="(item, index) in favoriteList" :film-data="item" film-group="extra" :key="index")
		button(v-if="showBtnMore" type="button" @click="onClickBtnMore").films-list__show-more Show more
</template>

<script>
	import FilmCard from '../film-card'

	export default {
		name: "favorite",
		components: {FilmCard},
		data() {
			return {
				counter: 5,
				step: 5,
				showBtnMore: null,
			}
		},
		methods: {
			onClickBtnMore() {
				this.counter < this.favoriteList.length ? this.counter += this.step
					: this.counter += this.favoriteList.length % this.counter;

				this.counter >= this.favoriteList.length ? this.showBtnMore = false
					: false;
			}
		},
		computed: {
			favoriteList() {
				return this.$store.state.favoriteList;
			}
		}
	}
</script>

<style scoped>

</style>
