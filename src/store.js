import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import Move from "./assets/js/model-move";

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
		history: []
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
				movies.push(new Move(item))
			}
			state.movies = movies;
		},
		updateMoviesGroup(state, payload) {
			state.moviesGroup = {
				favorite: payload.filter((it) => it.userDetails.favorite),
				watchList: payload.filter((it) => it.userDetails.watchlist),
				history: payload.filter((it) => it.userDetails.alreadyWatched)
			}
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
