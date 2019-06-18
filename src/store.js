import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import Movie from "./assets/js/model-movie";

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
		errorLoad: false,
		popupShow: false,
		popupData: null,

		favoriteList: [],
		watchList: [],
		historyList: []
	},
	getters: {
		movies: state => state.movies,
		popupShow: state => state.popupShow,
		popupData: state => state.popupData,
	},
	mutations: {
		updateMovies(state, payload) {
			const movies = [];
			for (let item of payload) {
				movies.push(new Movie(item))
			}
			state.movies = movies;
		},
		updateMoviesGroup(state) {
			state.favoriteList = state.movies.filter((it) => it.userDetails.favorite);
			state.watchList = state.movies.filter((it) => it.userDetails.watchList);
			state.historyList = state.movies.filter((it) => it.userDetails.alreadyWatched)
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
		},
		removeComment(state, id) {
			state.movies[id].comments.length = state.movies[id].comments.length - 1;
			state.popupData.comments.length = state.popupData.comments.length - 1;
		},
	},
	actions: {
		loadData({commit}) {
			axios.get(url, axiosConfig)
			.then((response) => {
				commit('updateMovies', response.data);
				commit('updateMoviesGroup', response.data);
			})
			.catch(() => {
				this.state.errorLoad = true;
			})
		},
		searchMovies({commit}, payload) {
			commit('changeRenderMovies', payload)
		}
	}
});
