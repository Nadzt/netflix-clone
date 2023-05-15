import React, { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"

import "./SearchBar.scss"

const SearchBar = ({setSearchBar}) => {
    const ref = useRef()
    const navigate = useNavigate()
    
    useEffect(() => {
        setTimeout(() => {
            ref.current.classList.add("searchbar--active")
        }, 0)

        const onBodyClick = (e) => {
            if(ref.current.contains(e.target)) return 
            setSearchBar(false)
        }
        document.body.addEventListener("click", onBodyClick, { capture: true })

        return () => {
            document.body.removeEventListener("click", onBodyClick, { capture: true })
        }
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const query = ref.current.value
        navigate(`/search/${query}`)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='searchbar__form'
        >
            <input 
                ref={ref}
                type="text"
                className='searchbar'
                placeholder='title'
            />
        </form>
    )
}

export default SearchBar