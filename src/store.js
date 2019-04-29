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
		moviesGroup: {},
		errorLoad: false,
		popupShow: false,
		popupData: null
	},
	getters: {
		movies: state => state.movies,
		popupShow: state => state.popupShow,
		popupData: state => state.popupData
	},
	mutations: {
		updateMovies(state, payload) {
			state.movies = payload;
		},
		closePopup(state) {
			state.popupShow = false;
			state.popupData = null;
		},
		openPopup(state, payload) {
			state.popupData = payload;
			state.popupShow = true;
		},
		getAd() {
			console.log(this.movies)
		},
		changeMovie(state, payload) {
			state.movies[payload.id] = payload.data;
		},
		changeCurrentRating(state, payload) {
			state.popupData.user_details.personal_rating = payload;
		},
		changeCommentsList(state, payload) {
			state.popupData.comments.push(payload)
		}
	},
	actions: {
		loadData({commit}) {
			axios.get(url, axiosConfig)
			.then((response) => {
				commit('updateMovies', response.data);
			})
			.catch(() => {
				this.state.errorLoad = true;
			})
		}
	}
});
