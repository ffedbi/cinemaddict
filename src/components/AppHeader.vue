<template lang="pug">
	header.header
		router-link(tag="h1" to="/").header__logo.logo Moowle
		form.header__search.search
			input(type="text" name="search" placeholder="Search").search__field
			button(type="submit" class="visually-hidden") Search
		section.header__profile.profile
			p.profile__rating You rank: Fan!
</template>

<script>
	export default {
		name: "AppHeader"
	};
</script>

<style scoped></style>
