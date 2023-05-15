import React from 'react'
import { Link } from 'react-router-dom'

import "./ErrorMessage.scss"

const ErrorMessage = ({message = "Are you lost?"}) => {
    return (
        <div className='error'>
            <p className='error__message'>
                {message}
            </p>
            <p className='error__subtitle'>
                We didn't found that page. You'll find a lot of titles to explore on the home page
            </p>
            <Link
                to={"/"}
                className='error__button'
                >
                Home page
            </Link>
            <p className='error__code'>
                Error code: 404
            </p>
        </div>
    )
}

export default ErrorMessage