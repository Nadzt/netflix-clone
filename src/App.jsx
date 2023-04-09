import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import { Navbar } from "./components"
import { Home } from './pages'

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
