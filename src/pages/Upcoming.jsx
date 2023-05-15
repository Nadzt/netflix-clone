import React from 'react'

import { request } from '../api/tmdb'
import { PopUp, Row } from "../components"

const Upcoming = () => {
    return (
        <div>
            <PopUp />
            <Row
                marginTop={"125px"}
                title={"Upcoming Movies"}
                fetchUrl={request.upcoming}
            />
        </div>
    )
}

export default Upcoming