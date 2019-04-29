<template lang="pug">
	footer.footer
		section.footer__logo.logo.logo--smaller Moowle
		section.footer__statistics
			p {{ getNumMovies }} movies inside
</template>

<script>
	export default {
		name: "AppFooter",
		computed: {
			getNumMovies() {
				return this.$store.getters.movies.length;
			}
		}
	};
</script>

<style scoped></style>
