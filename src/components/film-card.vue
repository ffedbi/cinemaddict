<template lang="pug">
	article.film-card
		h3(@click="openPopup(filmData)").film-card__title {{ filmData['film_info'].title }}
		p.film-card__rating {{ filmData['film_info']['total_rating'] }}
		p.film-card__info
			span.film-card__year {{ getYear }}
			span.film-card__duration {{ getDuration }}
			span.film-card__genre {{ filmData['film_info'].genre[0] }}
		img(:src="filmData['film_info'].poster" :alt="filmData.film_info.title").film-card__poster
		p.film-card__description {{ filmData['film_info'].description }}
		button(v-if="filmData.comments" type="button" @click="openPopup(filmData)").film-card__comments {{ filmData.comments.length }} comments
		form(v-if="filmGroup === 'extra'" v-on:submit.prevent="").film-card__controls
			button(@click="onChangeTypeMovie" type="button" data-btn="watchlist" :class="filmData[`user_details`][`watchlist`] ? 'active-btn' : ''").film-card__controls-item.button.film-card__controls-item--add-to-watchlist Add to watchlist
			button(@click="onChangeTypeMovie" type="button" data-btn="already_watched" :class="filmData[`user_details`][`already_watched`] ? 'active-btn' : ''").film-card__controls-item.button.film-card__controls-item--mark-as-watched Mark as watched
			button(@click="onChangeTypeMovie" type="button" data-btn="favorite" :class="filmData[`user_details`][`favorite`] ? 'active-btn' : ''").film-card__controls-item.button.film-card__controls-item--favorite Mark as favorite
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
				newData.user_details[value] = !newData.user_details[value];
				this.$store.commit('changeMovie', newData);
			}
		},
		computed: {
			getYear() {
				return new Date(this.filmData.film_info.release.date).getFullYear()
			},
			getDuration() {
				const time = this.filmData['film_info'].runtime;
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
