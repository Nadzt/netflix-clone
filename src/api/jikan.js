import axios from "axios"

export default axios.create({
    baseURL: "https://api.jikan.moe/v4",
})

export const jikanRequests = {
    topAnime: "/top/anime"
}