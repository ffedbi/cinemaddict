<template lang="pug">
	nav.main-navigation
		router-link(tag="a" to="/all").main-navigation__item All movies
		router-link(tag="a" to="/watchlist").main-navigation__item Watchlist
			span(v-if="watchList.length ").main-navigation__item-count {{ watchList.length }}
		router-link(tag="a" to="/history").main-navigation__item History
			span(v-if="historyList.length").main-navigation__item-count {{ historyList.length }}
		router-link(tag="a" to="/favorites").main-navigation__item Favorites
			span(v-if="favoriteList.length").main-navigation__item-count {{ favoriteList.length }}
		router-link(tag="a" to="/statistic").main-navigation__item.main-navigation__item--additional Stats
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		name: "navigation",
		data() {
			return {};
		},
		computed: {
			...mapState(['favoriteList', 'watchList', 'historyList'])
		}
	};
</script>

<style scoped>

</style>
