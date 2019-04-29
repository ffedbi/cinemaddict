<template lang="pug">
	#app
		app-header
		navigation
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
	import Navigation from "./components/navigation";

	export default {
		components: {Navigation, AppFooter, AppHeader},
		beforeCreate() {
			this.$store.dispatch('loadData')
		}
	}
</script>
