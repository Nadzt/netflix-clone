import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import "./Row.scss"
import tmdb from '../../api/tmdb'
import { handlePopUp } from "../../functions"

const Row = ({marginTop = 0, title, fetchUrl}) => {
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
    }, [fetchUrl])

    const fetchMovies = async () => {
        let movies = (await tmdb.get(fetchUrl)).data.results
        setMovies(movies)
    }

    const handleLeftButton = () => {
        // prevents multiple clicks and makes this button only work when there are movies on the left
        if(translationIndex !== 1 || isPending) return
        setIsPending(true)

        const slider = sliderRef.current

        // same as handleRightButton
        slider.style.transform = `translateX(${0}%)`
        slider.addEventListener("transitionend", () => {
            setTimeout(() => {
                const newMovies = [...movies.slice(-6), ...movies.slice(0, -6)]
                setMovies(newMovies)
                slider.style.transitionDuration = "0ms"
                slider.style.transform = `translateX(-${100}%)`
                setTimeout(() =>{
                    slider.style.transitionDuration = "1000ms"
                    setIsPending(false)
                }, 100)
            })
        })
    }
    
    const handleRightButton = () => {
        //prevents multiple clicks!
        if(isPending) return
        setIsPending(true)

        const slider = sliderRef.current

        // first scroll to the right
        if(translationIndex === 0) {
            slider.style.transform = `translateX(-${100}%)`
            slider.addEventListener("transitionend", () => {
                setTimeout(() => {
                    setTranslationIndex(1)
                    setIsPending(false)
                }, 100);
            }, { once: true })
            return
        }

        // this handles the infinite transition, removes and translates the slider when it finishes
        // the animation to appear seamless, the setTimeouts are to prevent frame glitches
        slider.style.transform = `translateX(-${200}%)`
        slider.addEventListener("transitionend", () => {
            setTimeout(() => {
                const newMovies = [...movies.slice(6), ...movies.slice(0, 6)]
                setMovies(newMovies)
                slider.style.transitionDuration = "0ms"
                slider.style.transform = `translateX(-${100}%)`
                setTimeout(() =>{
                    slider.style.transitionDuration = "1000ms"
                    return setIsPending(false)
                }, 100)
            })
        })
    }

    const renderLink = (title, url) => {
        const stringNumber = url.substring(url.indexOf("&with_genres=") + 13)
        const genreNumber = parseInt(stringNumber)

        return (
            <h2 className='row__title'>
                <Link
                    to={`/genre/${genreNumber}`}
                    className='row__title-link'
                >
                    {title}
                </Link>
                <div className="row__arrow">
                    &#10097;
                </div>
            </h2>
        )
    }

    return (
        <div 
            className='row'
            style={ marginTop ? { marginTop } : {} }    
        >
            { fetchUrl.includes("&with_genres=") ? (
                renderLink(title, fetchUrl)
            ) : (
                <h2 className='row__title'>
                    {title}
                </h2>
            ) }

            <div className="row__content">
                <div 
                    className='row__slider'
                    ref={sliderRef}
                >
                    { movies.map((movie, index) => (
                        <div
                            key={index}
                            className='row__item'
                            onMouseMove={(e) => handlePopUp(
                                e,
                                movie.backdrop_path,
                                movie.poster_path,
                                movie.genre_ids,
                                movie.title || movie.name,
                                isPending
                            )}
                        >
                            <img 
                                src={baseImgUrl + (movie.backdrop_path ? movie.backdrop_path : movie.poster_path)} 
                                alt={movie.title || movie.name}
                                className='row__image'
                            />
                            <p className='row__item-title'>
                                <span className="row__item-title-text">
                                    {movie.title || movie.name}
                                </span>
                            </p>
                        </div>
                    )) }
                </div>
                <button 
                    className={`row__button row__button--left ${(isPending || translationIndex === 0) && "row__button--disabled"}`}
                    onClick={handleLeftButton}
                    >
                    &#10096;
                </button>
                <button 
                    className={`row__button row__button--right ${isPending && "row__button--disabled"}`}
                    onClick={handleRightButton}
                >
                    &#10097;
                </button>
            </div>
        </div>
    )
}

export default Row