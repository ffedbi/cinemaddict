<template lang="pug">
	section.film-details
		form.film-details__inner
			.film-details__close
				button(type="button" @click="closePopup").film-details__close-btn
			.film-details__info-wrap
				.film-details__poster
					img(:src="movie.film_info.poster" :alt="movie.film_info.title").film-details__poster-img
					p.film-details__age {{ movie.film_info.age_rating }} +
				.film-details__info
					.film-details__info-head
						.film-details__title-wrap
							h3.film-details__title {{ movie.film_info.title }}
							p.film-details__title-original Original: {{ movie.film_info.alternative_title }}
						.film-details__rating
							p.film-details__total-rating {{ movie.film_info.total_rating }}
							p.film-details__user-rating Your rate {{ movie.user_details.personal_rating }}
					table.film-details__table
						tbody
							tr.film-details__row
								td.film-details__term Director
								td.film-details__cell {{ movie.film_info.director }}
							tr.film-details__row
								td.film-details__term Writers
								td.film-details__cell {{ getWriters }}
							tr.film-details__row
								td.film-details__term Actors
								td.film-details__cell {{ getActors }}
							tr.film-details__row
								td.film-details__term Release Date
								td.film-details__cell {{ getReleaseDate }}
							tr.film-details__row
								td.film-details__term Runtime
								td.film-details__cell {{ movie.runtime }} min
							tr.film-details__row
								td.film-details__term Country
								td.film-details__cell {{ movie.film_info.release.release_country }}
							tr.film-details__row
								td.film-details__term Genres
								td.film-details__cell {{ getGenres }}
					p.film-details__film-description {{ movie.film_info.description }}
			section.film-details__controls
				input(type="checkbox" @change="changeTypeMovies" name="watchlist" id="watchlist" :checked="movie[`user_details`][`watchlist`] ? true : false").film-details__control-input.visually-hidden
				label(for="watchlist").film-details__control-label.film-details__control-label--watchlist Add to watchlist
				input(type="checkbox" @change="changeTypeMovies" name="already_watched" id="already_watched" :checked="movie[`user_details`][`already_watched`] ? true : false").film-details__control-input.visually-hidden
				label(for="already_watched").film-details__control-label.film-details__control-label--watched Already watched
				input(type="checkbox" @change="changeTypeMovies" name="favorite" id="favorite" :checked="movie[`user_details`][`favorite`] ? true : false").film-details__control-input.visually-hidden
				label(for="favorite").film-details__control-label.film-details__control-label--favorite Add to favorites
			section.film-details__comments-wrap
				comments(:comments="movie.comments")
				.film-details__new-comment
					div
						label(for="add-emoji").film-details__add-emoji-label 😐
						input(type="checkbox" id="add-emoji" name="add-emoji" @click="showEmojiList = !showEmojiList").film-details__add-emoji.visually-hidden
					div(v-if="showEmojiList").film-details__emoji-list
						input(type="radio" id="emoji-sleeping" name="comment-emoji" value="sleeping").film-details__emoji-item.visually-hidden
						label(for="emoji-sleeping").film-details__emoji-label 😴
						input(type="radio" id="emoji-emoji-neutral-face" name="comment-emoji" value="neutral-face").film-details__emoji-item.visually-hidden
						label(for="emoji-emoji-neutral-face").film-details__emoji-label 😐
						input(type="radio" id="emoji-grinning" name="comment-emoji" value="sleeping").film-details__emoji-item.visually-hidden
						label(for="emoji-grinning").film-details__emoji-label 😀
					label.film-details__comment-label
						textarea(placeholder="← Select reaction, add comment here" name="comment" v-on:keyup.ctrl.enter="addComments").film-details__comment-input
			section.film-details__user-rating-wrap
				.film-details__user-rating-controls
					span.film-details__watched-status.film-details__watched-status--active already watched
					button(type="button").film-details__watched-reset undo
				.film-details__user-score
					.film-details__user-rating-poster
						img(:src="movie.film_info.poster" :alt="movie.film_info.title").film-details__user-rating-img
					section.film-details__user-rating-inner
						h3.film-details__user-rating-title A Man On The Wall
						p.film-details__user-rating-feelings How you feel it?
						rating
</template>

<script>
	import moment from 'moment';
	import Comments from "./popup/comments";
	import Rating from "./popup/rating";

	export default {
		name: "popup",
		components: {Rating, Comments},
		props: ['movie'],
		data() {
			return {
				showEmojiList: false,
				activeEmoji: `😐`,
				emojiList: [`😐`, `😴`, '😀'],
			}
		},
		methods: {
			closePopup() {
				this.$store.commit('closePopup');
			},
			changeTypeMovies(e) {
				const value = e.target.name;
				let newData = this.movie;
				newData.user_details[value] = !newData.user_details[value];
				this.$store.commit('changeMovie', newData);
			},
			addComments(e) {
				const newComment = {
					author: 'You',
					comment: e.target.value,
					date: Date.now(),
					emotion: `neutral-face`
				};
				this.$store.commit('changeCommentsList', newComment)
			}
		},
		computed: {
			getActors() {
				return this.movie.film_info.actors.join(',')
			},
			getWriters() {
				return this.movie.film_info.writers.join(',')
			},
			getGenres() {
				return this.movie.film_info.genre.join(' ')
			},
			getReleaseDate() {
				return moment(this.movie.film_info.release.date).format('HH MMMM YYYY')
			}
		}
	}
</script>

<style scoped>

</style>
