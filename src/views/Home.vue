<template lang="pug">
	main.main
		navigation
		films(v-if="open === 'film'")
		statistic(v-if="open === 'stat'")
</template>

<script>
	import Navigation from "../components/navigation";
	import Films from "../components/films";
	import Statistic from "../components/statistic";

	export default {
		name: "home",
		components: {Statistic, Films, Navigation},
		data() {
			return {
				open: "film"
			}
		}
	};
</script>
