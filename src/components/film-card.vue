<template lang="pug">
	article.film-card
		h3.film-card__title {{ filmData['film_info'].title }}
		p.film-card__rating {{ filmData['film_info']['total_rating'] }}
		p.film-card__info
			span.film-card__year {{ getYear }}
			span.film-card__duration {{ getDuration }}
			span.film-card__genre {{ filmData['film_info'].genre[0] }}
		img(:src="filmData['film_info'].poster" :alt="filmData.film_info.title").film-card__poster
		p.film-card__description {{ filmData['film_info'].description }}
		button(v-if="filmData.comments" type="button").film-card__comments {{ filmData.comments.length }} comments
		form(v-on:submit.prevent).film-card__controls
			button.film-card__controls-item.button.film-card__controls-item--add-to-watchlist Add to watchlist
			button.film-card__controls-item.button.film-card__controls-item--mark-as-watched Mark as watched
			button.film-card__controls-item.button.film-card__controls-item--favorite Mark as favorite
</template>

<script>
	import moment from 'moment'

	export default {
		name: "film-card",
		props: {
			filmData: {
				type: Object,
			}
		},
		computed: {
			getYear() {
				return new Date(this.filmData.film_info.release.date).getFullYear()
			},
			getDuration() {
				const time = this.filmData['film_info'].runtime;
				const hours = moment(time).hours();
				return `${hours}H M`
			}
		},
	}
</script>

<style scoped>

</style>
