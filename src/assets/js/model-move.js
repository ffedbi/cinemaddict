export default class Move {
	constructor(data) {
		this.id = data.id;
		this.info = {
			title: data['film_info']['title'] || '',
			alternativeTitle: data['film_info']['alternative_title'] || '',
			director: data['film_info']['director'] || '',
			description: data['film_info']['description'],
			writers: data['film_info']['writers'] || [],
			actors: data['film_info']['actors'] || [],
			genre: data['film_info']['genre'] || [],
			img: data['film_info']['poster'] || '',
			release: {
				country: data['film_info']['release']['release_country'] || '',
				date: data['film_info']['release']['date'] || ''
			},
			runtime: data['film_info']['runtime'] || 0,
			rating: data['film_info']['total_rating'] || 0,
			ageRating: data['film_info']['age_rating'] || 0,
		};
		this.userDetails = {
			userRating: data['user_details']['personal_rating'],
			watchingDate: data['user_details']['watching_date'],
			watchList: data['user_details']['watchlist'],
			favorite: data['user_details']['favorite'],
			alreadyWatched: data['user_details']['already_watched'],
		};
		this.comments = [...data['comments']]
	}

	toRAW() {
		return {
			'id': this.id,
			'film_info': {
				'title': this.info.title,
				'alternative_title': this.info.alternativeTitle,
				'director': this.info.director,
				'description': this.info.description,
				'writers': this.info.writers,
				'actors': this.info.actors,
				'genre': this.info.genre,
				'poster': this.info.img,
				'release': {
					'release_country': this.info.release.country,
					'date': this.info.release.date
				},
				'runtime': this.info.runtime,
				'total_rating': this.info.rating,
				'age_rating': this.info.ageRating,
			},
			'user_details': {
				'personal_rating': this.userDetails.userRating,
				'watching_date': this.userDetails.watchingDate,
				'watchlist': this.userDetails.watchList,
				'favorite': this.userDetails.favorite,
				'already_watched': this.userDetails.alreadyWatched,
			}
		}
	}

	static parseMove(data) {
		return new Move(data)
	}

	static parseMovies(data) {
		return data.map(Move.parseMove())
	}
}
