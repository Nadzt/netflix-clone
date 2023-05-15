import React from 'react'

import { request } from '../api/tmdb'
import { Header, PopUp, Row, TopToday, DropdownLink } from "../components"

const Movies = () => {
    return (
        <div>
            <Header 
                fetchUrl={request.trending}
            />
            <PopUp />
            <DropdownLink
                title={"Movie Genres"}
                onlyMovies
            />
            <Row
                marginTop={"75.75vh"}
                title={"Trending"}
                fetchUrl={request.trending}
            />
            <TopToday
                title={"Top Ten Movies Today"}
                fetchUrl={request.trendingToday}
            />
            <Row
                title={"Top Rated"}
                fetchUrl={request.topRated}
            />
            <Row
                title={"Comedies"}
                fetchUrl={request.comedy}
            />
            <Row
                title={"Action"}
                fetchUrl={request.action}
            />
            <Row
                title={"Crime"}
                fetchUrl={request.crime}
            />
            <Row
                title={"Horror"}
                fetchUrl={request.horror}
            />
            <Row
                title={"Animated"}
                fetchUrl={request.animated}
            />
        </div>
    )
}

export default Movies