import React, { useState, useEffect, useRef } from 'react'

import "./Row.scss"
import tmdb, { request } from '../../api/tmdb'

const Row = ({marginTop = 0}) => {
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
        const movies = (await tmdb.get(request.trending)).data.results
        setMovies(movies)
    }

    const handleLeftButton = () => {
        // prevents multiple clicks and makes this button only work when there are movies on the left
        if(translationIndex !== 1 || isPending) return
        
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
                setIsPending(false)
            }, 100)
            return setTranslationIndex(1)
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
                    setIsPending(false)
                }, 100)
            })
        })
    }

    return (
        <div 
            className='row'
            style={ marginTop ? { marginTop } : {} }    
        >
            <h2 className='row__title'>
                Title
            </h2>

            <div className="row__content">
                <div 
                    className='row__slider'
                    ref={sliderRef}
                >
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