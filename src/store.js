import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

const url = 'https://es8-demo-srv.appspot.com/moowle//movies';
const axiosConfig = {
	headers: {
		Authorization: `Basic eo0w590ik29889a=${Math.random()}`
	}
};

export default new Vuex.Store({
	state: {
		openBlock: 'films',
		movies: [],
		errorLoad: false
	},
	mutations: {
		updateMovies(state, payload) {
			state.movies = payload
		}
	},
	actions: {
		loadData({commit}) {
			axios.get(url, axiosConfig)
			.then((response) => {
				console.log(response.data);
				commit('updateMovies', response.data)
			})
			.catch(() => {
				this.state.errorLoad = true;
			})
		}
	}
});
