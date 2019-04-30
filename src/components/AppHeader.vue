<template lang="pug">
	header.header
		router-link(tag="h1" to="/").header__logo.logo Moowle
		form(v-on:submit.prevent).header__search.search
			input(type="text" name="search" placeholder="Search" @input="searchMovies").search__field
			button(type="submit" class="visually-hidden") Search
		section.header__profile.profile
			p.profile__rating You rank: {{ getUserRating }}!
</template>

<script>
	export default {
		name: "AppHeader",
		data() {
			return {
				movies: this.$store.getters.movies
			}
		},
		methods: {
			searchMovies(e) {
				let value = e.target.value;
				const movies = this.$store.getters.movies;

				const res = movies.filter((it) => it.film_info.title.includes(value));
				console.log(res);
				this.$store.dispatch('searchMovies', res)
			}
		},
		computed: {
			getUserRating() {
				let moviesCounter = this.movies.length;
				switch (moviesCounter) {
					case moviesCounter < 10:
						return 'Novice';
					case moviesCounter < 20:
						return 'Fan';
					default:
						return 'Movie buff'
				}
			}
		}
	};
</script>

<style scoped></style>
