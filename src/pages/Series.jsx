import React from 'react'

import { request } from '../api/tmdb'
import { Header, PopUp, Row, TopToday, DropdownLink } from "../components"

const Series = () => {
    return (
        <div>
            <Header 
                fetchUrl={request.seriesTopRated}
                isSeries
            />
            <PopUp />
            <DropdownLink
                title={"TV Series Genres"}
            />
            <Row
                marginTop={"75.75vh"}
                title={"Top Rated"}
                fetchUrl={request.seriesTopRated}
            />
            <TopToday
                title={"Top Ten Series Today"}
                fetchUrl={request.seriesPopular}
            />
            <Row
                title={"Comedy Series"}
                fetchUrl={request.seriesComedy}
            />
            <Row
                title={"Animated Series"}
                fetchUrl={request.seriesAnimated}
            />
            <Row
                title={"Drama Series"}
                fetchUrl={request.seriesDrama}
            />
            <Row
                title={"Crime Series"}
                fetchUrl={request.seriesCrime}
            />
        </div>
    )
}

export default Series