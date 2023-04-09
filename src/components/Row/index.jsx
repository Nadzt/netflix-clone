import React, { useState, useEffect } from 'react'

import "./Row.scss"
import tmdb, { request } from '../../api/tmdb'

const Row = ({marginTop = 0}) => {
    const [movies, setMovies] = useState([])
    const baseImgUrl = "https://image.tmdb.org/t/p/w500/"
    
    useEffect(() => {
        fetchMovies()
        return () => {
            fetchMovies()
        }
    }, [])

    const fetchMovies = async () => {
        const movies = (await tmdb.get(request.trending)).data.results
        setMovies(movies)
        console.log(movies[0])
    }

    return (
        <div 
            className='row'
            style={{ marginTop }}    
        >
            <h2 className='row__title'>
                Title
            </h2>
            <div className="row__content">
                { movies.map((movie, index) => (
                    <div
                        key={index}
                        className='row__item' 
                    >
                        <img 
                            src={baseImgUrl + movie.backdrop_path} 
                            alt={movie.title}
                            className='row__image'
                        />
                    </div>
                )) }
                <button className='row__button row__button--left'>
                    &#10096;
                </button>
                <button className='row__button row__button--right'>
                    &#10097;
                </button>
            </div>
        </div>
    )
}

export default Row