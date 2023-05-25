import axios from "axios"

export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`
    }
})

export const request = {
    video: `/videos?language=en-US`,
    trending: `/trending/movie/week`,
    trendingToday: `/trending/movie/day`,
    topRated: `/movie/top_rated?language=en-US&page=1`,
    comedy: `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35`,
    animated: `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=16`,
    musical: `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10402`,
    action: `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28`,
    western: `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=37`,
    crime: `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=80`,
    horror: `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27`,
    drama: `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=18`,
    war: `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10752`,
    popular: `/movie/popular?language=en-US&page=1`,
    genres: `/genre/movie/list?language=en-US`,
    latest: `/movie/latest`,
    upcoming: `/movie/upcoming?language=en-US&page=1`,

    seriesPopular: `/tv/popular?language=en-US&page=1`,
    seriesTopRated: `/tv/top_rated?language=en-US&page=1`,
    seriesComedy: `/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35`,
    seriesCrime: `/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80`,
    seriesAnimated: `/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16`,
    seriesDrama: `/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18`,
    seriesLatest: `/tv/latest`,
}

const fetchMovieByGenre = (genre) => {
}