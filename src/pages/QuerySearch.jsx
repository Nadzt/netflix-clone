import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import tmdb from '../api/tmdb';
import { PopUp, ErrorMessage, ShowAllResults } from "../components"

const Search = () => {
    const { query } = useParams()
    const [results, setResults] = useState([])
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const fetchByQuery = async (query) => {
            let moviesRes = (await tmdb.get(`/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)).data.results
            let showsRes = (await tmdb.get(`/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)).data.results
            setResults([...moviesRes, ...showsRes])
            setFetching(false)
        }
        
        fetchByQuery(query)
        return() => {
            fetchByQuery(query)
        }
    }, [query])

    return (
        <div>
            <PopUp />
            { results.length > 0 && (
                <ShowAllResults
                    data={results}
                />
            )}
            { results.length === 0 && !fetching && (
                <ErrorMessage />
            )}
        </div>
    )
}

export default Search