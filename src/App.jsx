import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Navbar, Footer, ErrorMessage } from "./components"
import { Home, Series, Movies, Upcoming, Search } from './pages'
import "./App.scss"

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/genre/shows' element={<Series />}/>
                    <Route path='/genre/movies' element={<Movies />}/>
                    <Route path='/genre/new' element={<Upcoming />}/>
                    <Route path='/genre/:id' element={<Search /> }/>
                    <Route path='*' element={<ErrorMessage />}/>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App
