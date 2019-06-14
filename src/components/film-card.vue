<template lang="pug">
	article.film-card
		h3(@click="openPopup(filmData)").film-card__title {{ filmData.info.title }}
		p.film-card__rating {{ filmData.info.rating }}
		p.film-card__info
			span.film-card__year {{ getYear }}
			span.film-card__duration {{ getDuration }}
			span.film-card__genre {{ filmData.info.genre[0] }}
		img(:src="filmData.info.img" :alt="filmData.info.title").film-card__poster
		p.film-card__description {{ filmData.description }}
		button(v-if="filmData.comments" type="button" @click="openPopup(filmData)").film-card__comments {{ filmData.comments.length }} comments
		form(v-if="filmGroup === 'extra'" v-on:submit.prevent="").film-card__controls
			button(@click="onChangeTypeMovie" type="button" data-btn="watchList" :class="filmData.userDetails.watchList ? 'active-btn' : ''").film-card__controls-item.button.film-card__controls-item--add-to-watchlist Add to watchlist
			button(@click="onChangeTypeMovie" type="button" data-btn="alreadyWatched" :class="filmData.userDetails.alreadyWatched ? 'active-btn' : ''").film-card__controls-item.button.film-card__controls-item--mark-as-watched Mark as watched
			button(@click="onChangeTypeMovie" type="button" data-btn="favorite" :class="filmData.userDetails.favorite ? 'active-btn' : ''").film-card__controls-item.button.film-card__controls-item--favorite Mark as favorite
</template>

<script>
	export default {
		name: "film-card",
		props: {
			filmData: {
				type: Object,
			},
			filmGroup: {
				type: String
			}
		},
		methods: {
			openPopup(data) {
				this.$store.commit('openPopup', data)
			},
			onChangeTypeMovie(e) {
				const value = e.target.dataset.btn;
				let newData = this.filmData;
				newData.userDetails[value] = !newData.userDetails[value];
				this.$store.commit('changeMovie', newData);
			}
		},
		computed: {
			getYear() {
				return new Date(this.filmData.info.release.date).getFullYear()
			},
			getDuration() {
				const time = this.filmData.info.runtime;
				const hours = Math.floor(time / 60);
				const minutes = time % 60;
				return `${hours}:${minutes}`
			},
		},
	}
</script>

<style scoped lang="scss">
	.active-btn {
		border: 1px solid rgb(245, 223, 0);
	}
</style>
