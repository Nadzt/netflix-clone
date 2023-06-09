import React from 'react'

import { request } from '../api/tmdb'
import { Header, PopUp, Row, TopToday } from "../components"

const Home = () => {
    return (
        <div>
            <Header 
                fetchUrl={request.trending}
            />
            <PopUp />
            <Row
                marginTop={"89.25vh"}
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
                title={"Musicals"}
                fetchUrl={request.musical}
            />
            <Row
                title={"Action"}
                fetchUrl={request.action}
            />
            <Row
                title={"War"}
                fetchUrl={request.war}
            />
            <Row
                title={"Western"}
                fetchUrl={request.western}
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
                title={"Drama"}
                fetchUrl={request.drama}
            />
            <Row
                title={"Animated"}
                fetchUrl={request.animated}
            />
            <Row
                title={"Popular"}
                fetchUrl={request.popular}
            />
        </div>
    )
}

export default Home