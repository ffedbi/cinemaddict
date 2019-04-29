<template lang="pug">
	.film-details__user-rating-score
		template(v-for="item in num")
			input(type="radio" name="score" :id="`rating-${item}`" @click="changeRating(item)" :checked="item === currentRating ? `checked` : ``").film-details__user-rating-input.visually-hidden
			label(:for="`rating-${item}`").film-details__user-rating-label {{ item }}
</template>

<script>
	export default {
		name: "rating",
		props: {
			num: {
				type: Number,
				default: 9
			}
		},
		methods: {
			changeRating(item) {
				this.$store.commit('changeCurrentRating', item)
			}
		},
		computed: {
			currentRating() {
				return this.$store.getters.popupData.user_details.personal_rating;
			}
		}
	}
</script>

<style scoped>

</style>
