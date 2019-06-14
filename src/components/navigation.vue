<template lang="pug">
	nav.main-navigation
		a(v-for="(item, index) in data" :href="item.href" :key="index").main-navigation__item {{ item.text }}
			span.main-navigation__item-count {{ 19 }}
		router-link(tag="a" to="/statistic").main-navigation__item.main-navigation__item--additional Stats
</template>

<script>
	export default {
		name: "navigation",
		data() {
			return {
				data: [
					{
						href: "#all",
						text: "All movies",
					},
					{
						href: "#watchlist",
						text: "Watchlist",
					},
					{
						href: "#history",
						text: "History",
					},
					{
						href: "#facorites",
						text: "Favorites",
					}
				]
			};
		}
	};
</script>

<style scoped>

</style>
