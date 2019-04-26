import Vue from "vue";
import Router from "vue-router";
import Statictic from './components/statistic'
import Home from './views/Home'

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/statistic",
			name: "statistic",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: Statictic
		}
	]
});
