import React, { useEffect } from 'react'

import "./ShowAllResults.scss"
import { handlePopUp } from '../../functions'

const ShowAllResults = ({data}) => {
    const baseImgUrl = "https://image.tmdb.org/t/p/w500/"

    const renderData = (data) => {
        return data.map((item, index) => (item.backdrop_path || item.poster_path) && (
            <div
                key={index}
                className='all-results__item'
                onMouseMove={(e) => handlePopUp(
                    e,
                    item.backdrop_path,
                    item.poster_path,
                    item.genre_ids,
                    item.title || item.name,
                    false,
                    false
                )}
            >
                <img 
                    src={baseImgUrl + (item.backdrop_path ? item.backdrop_path : item.poster_path)} 
                    alt={item.title || item.name}
                    className='all-results__image'
                />
                <p className='all-results__item-title'>
                    <span className="all-results__item-title-text">
                        {item.title || item.name}
                    </span>
                </p>
            </div>
        ))
    }

    return (
        <div className='all-results'>
            <div className='all-results__container'>
                {renderData(data)}
            </div>
        </div>
    )
}

export default ShowAllResults