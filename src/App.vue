<template lang="pug">
	#app
		app-header
		router-view
		app-footer
</template>

<style lang="scss">
	@import "assets/css/normalize.css";
	@import "assets/css/main.css";
</style>
<script>
	import AppHeader from "./components/AppHeader";
	import AppFooter from "./components/AppFooter";

	export default {
		components: {AppFooter, AppHeader},
		mounted() {
			this.$store.dispatch('loadData')
		}
	}
</script>
