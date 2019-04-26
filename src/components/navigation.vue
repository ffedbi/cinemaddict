<template lang="pug">
	nav.main-navigation
		a(v-for="(item, index) in data" :href="item.href" :key="index").main-navigation__item {{ item.text }}
			span(v-if="item.count").main-navigation__item-count {{ item.count }}
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
						count: 7
					},
					{
						href: "#history",
						text: "History",
						count: 17
					},
					{
						href: "#facorites",
						text: "Favorites",
						count: 1
					}
				]
			};
		}
	};
</script>

<style scoped>

</style>
