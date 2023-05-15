import React, { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"

import "./DropdownLink.scss"

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

const DropdownLink = ({ title = "All Genres", options, onlyMovies = false }) => {
    const [ open, setOpen ] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const onBodyClick = (e) => {
            if(ref.current.contains(e.target)) return 
            setOpen(false)
        }
        document.body.addEventListener("click", onBodyClick, { capture: true })

        return () => {
            document.body.removeEventListener("click", onBodyClick, { capture: true })
        }
    } , [])

    const renderedOptions = (options) => options.map(option => {
        return (
            <li 
                className="dropdownLink__list-item"
                key={option.id}
            >
                <Link
                    to={`/genre/${option.id}`}
                    className="dropdownLink__link"
                >
                    {option.name}
                </Link>
            </li>
        )
    })

    return (
        <div ref={ref} className="dropdownLink">
            <button 
                className="dropdownLink__button"
                onClick={() => setOpen(!open)} 
            >
                {title}
            </button>
            <div 
                className={`dropdownLink__container ${open ? "dropdownLink__container--active" : ""}`}
                onClick={() => {setOpen(!open)}}
            >
                <ul className="dropdownLink__list">
                    {renderedOptions(options || (onlyMovies && genres) || tvGenres)}
                </ul>
            </div>
        </div>
    )
}

export default DropdownLink