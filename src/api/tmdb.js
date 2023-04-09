import axios from "axios"

const KEY = "c108b72b91f019e8e8c1182f73f49ab0"

export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
})

export const request = {
    trending: `/trending/movie/week?api_key=${KEY}`,
    video: "/videos?api_key=c108b72b91f019e8e8c1182f73f49ab0&language=en-US"
}

const fetchMovieByGenre = (genre) => {
}