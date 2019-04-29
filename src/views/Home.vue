<template lang="pug">
	main.main
		films(v-if="open === 'film'")
		statistic(v-if="open === 'stat'")
		popup(v-if="popupShow" :movie="popupData")
</template>

<script>
	import {mapGetters} from 'vuex';
	import Films from "../components/films";
	import Statistic from "../components/statistic";
	import Popup from "../components/popup";

	const keyCodeEsc = 27;

	export default {
		name: "home",
		components: {Popup, Statistic, Films},
		data() {
			return {
				open: "film"
			}
		},
		methods: {
			isKeydownEsc(e) {
				if (e.keyCode == keyCodeEsc) {
					this.$store.commit('closePopup')
				}
			}
		},
		computed: {
			...mapGetters([
				'popupShow', 'popupData'
			])
		},
		created() {
			document.addEventListener(`keydown`, this.isKeydownEsc)
		},
		destroyed() {
			document.removeEventListener(`keydown`, this.isKeydownEsc)
		}
	};
</script>
