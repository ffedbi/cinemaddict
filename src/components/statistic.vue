<template lang="pug">
	section.statistic
		p.statistic__rank You rank
			span.statistic__rank-label Fan
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
				p.statistic__item-text {{ getTotalDuration }}
					//| 41
					//span.statistic__item-description h
					//| 8
					//span.statistic__item-description m
					|
			li.statistic__text-item
				h4.statistic__item-title Top genre
				p.statistic__item-text {{getTopGanre || `Action`}}
		.statistic__chart-wrap
			.chartjs-size-monitor
				.chartjs-size-monitor-expand
				canvas(width="1000" height="450").statistic__chart.chartjs-render-monitor
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		name: "statistic",
		data() {
			return {}
		},
		computed: {
			...mapGetters([
				'movies'
			]),
			getTotalDuration() {
				let res = 0;
				for (let movie of this.movies) {
					res += movie['film_info'].runtime
				}
				// console.log(res);
				return res
			},
			getTopGanre() {
				let arr = [];
				let res = {};
				this.movies.forEach((it) => arr.push(...it['film_info'].genre));

				for (let item of arr) {
					if (!res[item]) {
						res[item] = 0
					}
					res[item]++
				}

				console.log(res)
			}
		}
	}
</script>

<style scoped>

</style>
