import React, { useEffect, useState } from 'react'

import "./Header.scss" 
import background from "../../assets/background.png"
import tmdb, { request } from '../../api/tmdb'

// /movie/movie_id/videos?language=en-US
// /tv/series_id/videos?language=en-US

const pickRandomMovieWithTrailer = async (array, isSeries) => {
    let movie = array[Math.floor(Math.random() * array.length)]
    const movieVideos = (await tmdb.get(`/${isSeries ? "tv" : "movie" }/${movie.id + request.video}`)).data.results
    const movieTrailer = movieVideos.find(el => el.iso_639_1 === "en" && el.name.toLowerCase().includes("trailer"))
    if(!movieTrailer) return pickRandomMovieWithTrailer(array, isSeries)
    return { movie: movie , trailer: movieTrailer }
}

const Header = ({fetchUrl, isSeries = false}) => {
    const [banner, setBanner] = useState({})

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string
    }

    useEffect(() => {
        fetchHeader()
        return () => {
            fetchHeader()
        }
    }, [])

    const fetchHeader = async () => {
        const res = (await tmdb.get(fetchUrl)).data.results
        setBanner(await pickRandomMovieWithTrailer(res, isSeries))
        setTimeout(() => {
            let bannerImg = document.querySelector(".header__background-img")
            let fade = document.querySelector(".header__bottom-fade")
            let title = document.querySelector(".header__title")
            let description = document.querySelector(".header__description")
            bannerImg.classList.add("header__background-img--hidden")
            bannerImg.addEventListener("webkitTransitionEnd", () => { 
                fade.style.zIndex = 5
                bannerImg.style.zIndex = 2
            })
            setTimeout(() => {
                title.classList.add("header__title--animated")
                description.style.marginBottom = `-${description.clientHeight}px`
                description.style.opacity = 0
                description.classList.add("prevent-select")
            }, 5000)
        }, 2000)
    }

    return (
        <div className='header'>
            {banner.movie && banner.trailer && (
                <React.Fragment>
                    <iframe
                        className='header__video'
                        src={`https://www.youtube.com/embed/${banner.trailer.key}?playlist=${banner.trailer.key}&loop=1&autoplay=1&mute=1&controls=1&disablekb=0`}
                        title={banner.trailer.name} 
                        frameBorder="0" 
                        allow="autoplay" 
                        allowFullScreen
                    ></iframe>
                    <div className="header__details">
                        <h1 className='header__title'>
                            {banner.movie.title || banner.movie.name}
                        </h1>
                        <p className='header__description'>
                            {truncate(banner.movie.overview, 300)}
                        </p>
                        <div className="header__buttons">
                            <div className="header__button header__button--1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="header__icon" data-name="Play">
                                    <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
                                </svg>
                                Play
                            </div>
                            <div className="header__button header__button--2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="header__icon" data-name="Info">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path>
                                </svg>
                                More Info
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}
            <img src={background} alt=""    className='header__background-img'/>
            <div className="header__bottom-fade"></div>
        </div>
    )
}

export default Header