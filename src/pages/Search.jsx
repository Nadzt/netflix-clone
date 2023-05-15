import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { PopUp, Row, ErrorMessage, DropdownLink } from "../components"

const genres = [
    { id: "28", name: "Action" },
    { id: "12", name: "Adventure" },
    { id: "16", name: "Animation" },
    { id: "35", name: "Comedy" },
    { id: "80", name: "Crime" },
    { id: "99", name: "Documentary" },
    { id: "18", name: "Drama" },
    { id: "10751", name: "Family" },
    { id: "14", name: "Fantasy" },
    { id: "36", name: "History" },
    { id: "27", name: "Horror" },
    { id: "10402", name: "Music" },
    { id: "9648", name: "Mystery" },
    { id: "10749", name: "Romance" },
    { id: "878", name: "Science Fiction" },
    { id: "10770", name: "TV Movie" },
    { id: "53", name: "Thriller" },
    { id: "10752", name: "War" },
    { id: "37", name: "Western" }
]

const tvGenres= [
    { id: "16", name: "Animation" },
    { id: "35", name: "Comedy" },
    { id: "10759", name: "Action & Adventure" },
    { id: "80", name: "Crime" },
    { id: "99", name: "Documentary" },
    { id: "18", name: "Drama" },
    { id: "10751", name: "Family" },
    { id: "10762", name: "Kids" },
    { id: "9648", name: "Mystery" },
    { id: "10763", name: "News" },
    { id: "10764", name: "Reality" },
    { id: "10765", name: "Sci-Fi & Fantasy" },
    { id: "10766", name: "Soap" },
    { id: "10767", name: "Talk" },
    { id: "10768", name: "War & Politics" },
    { id: "37", name: "Western" }
]

const uniqueGenres = [...genres, ...tvGenres].reduce((acc, current) => {
    const duplicatedGenre = acc.find(genre => genre.id === current.id)
    if (!duplicatedGenre) acc.push(current)
    return acc;
}, [])

const Search = () => {
    const { id } = useParams()
    const [genre, setGenre] = useState({})
    const [tvGenre, setTvGenre] = useState({})

    const searchGenre = () => {
        const isValidGenre = genres.find(genre => genre.id === id)
        const isValidTVGenre = tvGenres.find(genre => genre.id === id)
        setGenre(isValidGenre)
        setTvGenre(isValidTVGenre)
    }
    
    useEffect(() => {
        searchGenre()
        return() => {
            searchGenre()
        }
    })

    return (
        <div>
            <PopUp />
            <DropdownLink
                options={uniqueGenres}
                extendedButtons
            />
            { genre?.name && 
                <Row
                    marginTop={"45px"}
                    title={`${genre.name} Movies`}
                    fetchUrl={`/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre?.id}`}
                />
            }
            { tvGenre?.name && 
                <Row
                    marginTop={genre?.name ? "" : "45px"}
                    title={`${tvGenre?.name} TV Shows`}
                    fetchUrl={`/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${tvGenre?.id}`}
                />
            }
            { !tvGenre?.name && !genre?.name && 
                <ErrorMessage />
            }
        </div>
    )
}

export default Search