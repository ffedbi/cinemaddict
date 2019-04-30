<template lang="pug">
	canvas(ref="myChart" width="1000" height="450")
</template>

<script>
	import Chart from 'chart.js';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	export default {
		name: 'monthly-sales-chart',
		props: ['chartData'],
		mounted() {
			new Chart(this.$refs.myChart, {
				plugins: [ChartDataLabels],
				type: 'horizontalBar',
				data: {
					labels: this.chartData.labels,
					datasets: [
						{
							data: this.chartData.values,
							backgroundColor: `#ffe800`,
							hoverBackgroundColor: `#ffe800`,
							anchor: `start`
						}
					]
				},
				options: {
					plugins: {
						datalabels: {
							font: {
								size: 20
							},
							color: `#ffffff`,
							anchor: `start`,
							align: `start`,
							offset: 40,
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								fontColor: `#ffffff`,
								padding: 100,
								fontSize: 20
							},
							gridLines: {
								display: false,
								drawBorder: false
							},
							barThickness: 24
						}],
						xAxes: [{
							ticks: {
								display: false,
								beginAtZero: true
							},
							gridLines: {
								display: false,
								drawBorder: false
							},
						}],
					},
					legend: {
						display: false
					},
					tooltips: {
						enabled: false
					}
				}
			});
		}
	}
</script>

<style scoped>

</style>
