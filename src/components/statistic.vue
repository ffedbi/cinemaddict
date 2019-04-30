<template lang="pug">
	section.statistic
		p.statistic__rank You rank
			span.statistic__rank-label  Fan
		form.statistic__filters
			p.statistic__filters-description Show stats:
			input(type="radio" name="statistic-filter" id="statistic-all-time" value="all-time" checked).statistic__filters-input.visually-hidden
			label(for="statistic-all-time").statistic__filters-label All time
			input(type="radio" name="statistic-filter" id="statistic-today" value="statistic-today").statistic__filters-input.visually-hidden
			label(for="statistic-today").statistic__filters-label Today
			input(type="radio" name="statistic-filter" id="statistic-week" value="week").statistic__filters-input.visually-hidden
			label(for="statistic-week").statistic__filters-label Week
			input(type="radio" name="statistic-filter" id="statistic-month" value="mount").statistic__filters-input.visually-hidden
			label(for="statistic-month").statistic__filters-label Mouth
			input(type="radio" name="statistic-filter" id="statistic-year" value="year").statistic__filters-input.visually-hidden
			label(for="statistic-year").statistic__filters-label Year
		ul.statistic__text-list
			li.statistic__text-item
				h4.statistic__item-title You watched
				p.statistic__item-text {{ movies.length }}
					span.statistic__item-description movies
			li.statistic__text-item
				h4.statistic__item-title Total duration
				p.statistic__item-text
					| {{ duration.hours }}
					span.statistic__item-description h
					| {{ duration.minute }}
					span.statistic__item-description m
			li.statistic__text-item
				h4.statistic__item-title Top genre
				p.statistic__item-text {{ getTopGanre.labels[0]}}
		.statistic__chart-wrap
			line-chart(:chartData="getTopGanre")
</template>

<script>
	import {mapGetters} from 'vuex';
	import LineChart from "./line-chart";

	export default {
		name: "statistic",
		components: {
			LineChart
		},
		data() {
			return {
				duration: {
					hours: 0,
					minute: 0
				}
			}
		},
		computed: {
			...mapGetters([
				'movies'
			]),
			getTopGanre() {
				let arr = [];
				let res = {};
				this.movies.forEach((it) => arr.push(...it['film_info'].genre));

				for (let item of arr) {
					if (!res[item]) {
						res[item] = 0;
					}
					res[item]++;
				}
				return {
					labels: Object.keys(res),
					values: Object.values(res)
				}
			}
		},
		created() {
			let duration = 0;
			for (let movie of this.movies) {
				duration += movie['film_info'].runtime
			}

			this.duration.hours = Math.floor(duration / 60);
			this.duration.minute = duration % 60;
		}
	}
</script>

<style scoped>

</style>
