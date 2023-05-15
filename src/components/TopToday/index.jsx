import React, { useState, useEffect, useRef } from 'react'

import "./TopToday.scss"
import tmdb from '../../api/tmdb'
import { handlePopUp } from "../../functions"

const TopToday = ({title, fetchUrl}) => {
    const [movies, setMovies] = useState([])
    const [translationIndex, setTranslationIndex] = useState(0)
    const [isPending, setIsPending] = useState(false)
    const sliderRef = useRef()

    const baseImgUrl = "https://image.tmdb.org/t/p/w500/"

    useEffect(() => {
        fetchMovies()
        return () => {
            fetchMovies()
        }
    }, [])

    const fetchMovies = async () => {
        let movies = (await tmdb.get(fetchUrl)).data.results.slice(0, 10)
        setMovies(movies)
    }

    const handleButton = (direction) => {
        // prevents spamming before finalized transition and bugs when clicking disabled buttons
        if(isPending || (direction === "left" && translationIndex === 0) || (direction === "right" && translationIndex === 1)) return
        setIsPending(true)

        if(direction === "left") {
            setTranslationIndex(0)
        } else { setTranslationIndex(1) }

        const slider = sliderRef.current
        slider.style.transform = direction === "left" ? `translateX(0px)` : `translateX(${slider.clientWidth - slider.scrollWidth}px)`
        slider.addEventListener("transitionend", () => {
            setTimeout(() => {
                setIsPending(false)
            })
        })
    }

    return (
        <div 
            className='row'   
        >
            <h2 className='row__title'>
                {title}
            </h2>

            <div className="row__content">
                <div 
                    className='row__slider'
                    ref={sliderRef}
                >
                    { movies.map((movie, index) => (
                        <div
                            key={index}
                            className='topToday__item'
                            onMouseMove={(e) => handlePopUp(
                                e,
                                movie.backdrop_path,
                                movie.poster_path,
                                movie.genre_ids,
                                movie.title || movie.name,
                                isPending
                            )}
                        >   
                            <p className={`topToday__number ${ index === 9 && "topToday__numberTen"}`}>
                                {index + 1}
                            </p>
                            <img 
                                src={baseImgUrl + (movie.poster_path ? movie.poster_path : movie.backdrop_path)} 
                                alt={movie.title || movie.name}
                                className='topToday__image'
                            />
                        </div>
                    )) }
                </div>
                <button 
                    className={`row__button row__button--left ${(isPending || translationIndex === 0) && "row__button--noDisplay"}`}
                    onClick={() => handleButton("left")}
                    >
                    &#10096;
                </button>
                <button 
                    className={`row__button row__button--right ${(isPending || translationIndex === 1) && "row__button--noDisplay"}`}
                    onClick={() => handleButton("right")}
                >
                    &#10097;
                </button>
            </div>
        </div>
    )
}

export default TopToday