import Vue from "vue";
import Router from "vue-router";
import Statictic from './components/statistic'
import Favorite from './components/pages/favorite'
import All from './components/pages/all'
import History from './components/pages/history'
import Watchlist from './components/pages/watchlist'
import Home from './views/Home'

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
			redirect: '/all',
			children: [
				{
					path: '/all',
					name: 'all',
					component: All,
				},
				{
					path: '/favorites',
					name: 'favorites',
					component: Favorite
				},
				{
					path: '/history',
					name: 'history',
					component: History
				},
				{
					path: '/watchlist',
					name: 'watchlist',
					component: Watchlist
				}
			]
		},
		{
			path: "/statistic",
			name: "statistic",
			component: Statictic
		}
	]
});
