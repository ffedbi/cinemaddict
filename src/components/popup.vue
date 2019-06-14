<template lang="pug">
	section.film-details
		form.film-details__inner
			.film-details__close
				button(type="button" @click="closePopup").film-details__close-btn
			.film-details__info-wrap
				.film-details__poster
					img(:src="movie.info.img" :alt="movie.info.title").film-details__poster-img
					p.film-details__age {{ movie.info.ageRating }} +
				.film-details__info
					.film-details__info-head
						.film-details__title-wrap
							h3.film-details__title {{ movie.info.title }}
							p.film-details__title-original Original: {{ movie.info.alternativeTitle }}
						.film-details__rating
							p.film-details__total-rating {{ movie.info.rating }}
							p.film-details__user-rating Your rate {{ movie.userDetails.userRating }}
					table.film-details__table
						tbody
							tr.film-details__row
								td.film-details__term Director
								td.film-details__cell {{ movie.info.director }}
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
								td.film-details__cell {{ movie.info.runtime }} min
							tr.film-details__row
								td.film-details__term Country
								td.film-details__cell {{ movie.info.release.country }}
							tr.film-details__row
								td.film-details__term Genres
								td.film-details__cell {{ getGenres }}
					p.film-details__film-description {{ movie.info.description }}
			section.film-details__controls
				input(type="checkbox" @change="changeTypeMovies" name="watchList" id="watchList" :checked="movie.userDetails.watchList ? true : false").film-details__control-input.visually-hidden
				label(for="watchList").film-details__control-label.film-details__control-label--watchlist Add to watchlist
				input(type="checkbox" @change="changeTypeMovies" name="alreadyWatched" id="alreadyWatched" :checked="movie.userDetails.alreadyWatched ? true : false").film-details__control-input.visually-hidden
				label(for="alreadyWatched").film-details__control-label.film-details__control-label--watched Already watched
				input(type="checkbox" @change="changeTypeMovies" name="favorite" id="favorite" :checked="movie.userDetails.favorite ? true : false").film-details__control-input.visually-hidden
				label(for="favorite").film-details__control-label.film-details__control-label--favorite Add to favorites
			section.film-details__comments-wrap
				comments(:comments="getComments")
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
				div(v-if="showBtnRemove").film-details__user-rating-controls
					span.film-details__watched-status {{ showTextRemoveComment ? textCommentDelActions : 'already watched'}}
					button(v-if="showBtnRemove" type="button" @click="removeComment").film-details__watched-reset undo
				.film-details__user-score
					.film-details__user-rating-poster
						img(:src="movie.info.img" :alt="movie.info.title").film-details__user-rating-img
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
				showBtnRemove: false,
				showTextRemoveComment: false,
				textCommentDelActions: 'Comment deleted'
			}
		},
		methods: {
			closePopup() {
				this.$store.commit('closePopup');
			},
			changeTypeMovies(e) {
				const value = e.target.name;
				let newData = this.movie;
				newData.userDetails[value] = !newData.userDetails[value];
				this.$store.commit('changeMovie', newData);
			},
			addComments(e) {
				const newComment = {
					author: 'You',
					comment: e.target.value,
					date: Date.now(),
					emotion: `neutral-face`
				};
				this.$store.commit('changeCommentsList', newComment);
				this.showBtnRemove = true;
				e.target.value = '';
			},
			removeComment() {
				this.$store.commit('removeComment', this.movie.id);
				this.showBtnRemove = false;
			}
		},
		computed: {
			getComments() {
				return this.$store.getters.popupData.comments;
			},
			getActors() {
				return this.movie.info.actors.join(', ')
			},
			getWriters() {
				return this.movie.info.writers.join(', ')
			},
			getGenres() {
				return this.movie.info.genre.join(', ')
			},
			getReleaseDate() {
				return moment(this.movie.info.release.date).format('DD MMMM YYYY')
			}
		}
	}
</script>

<style scoped>

</style>
