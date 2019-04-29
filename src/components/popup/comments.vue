<template lang="pug">
	div
		h3.film-details__comments-title Comments
		span.film-details__comments-count {{ comments.length }}
		ul.film-details__comments-list
			li(v-for="(comment, index) in comments" :key="index").film-details__comment
				span.film-details__comment-emoji {{ getEmoji(comment[`emotion`]) }}
				div
					p.film-details__comment-text {{ comment.comment }}
					p.film-details__comment-info
						span.film-details__comment-author {{ comment.author }}
						span.film-details__comment-day  {{ getDateComment(comment.date) }}
</template>

<script>
	import moment from 'moment';

	const emojiList = {
		'neutral-face': `😐`,
		'sleeping': `😴`,
		'grinning': '😀'
	};

	export default {
		name: "comments",
		props: {
			comments: {
				type: Array
			}
		},
		methods: {
			getDateComment(date) {
				return date;
			},
			getEmoji(value) {
				return emojiList[value]
			},
			getDateComment(time) {
				const dateNow = Date.now();
				const res = moment(dateNow - time).day();
				return res === 0 ? 'yesterday' : `${res} days ago`
			}
		}
	}
</script>

<style scoped>

</style>
