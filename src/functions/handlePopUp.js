import tmdb, { request } from "../api/tmdb"

let tmdbGenres = []
const baseImgUrl = "https://image.tmdb.org/t/p/w500/"
export let popUpTimeoutId = null

const handlePopUp = (e, imageUrl, imagePoster, genres, title, isPending) => {
    //checks for animations, returns if a row is being moved
    if(isPending) return
    
    // selecting the popup component and it's children for easy writing
    const popup = document.querySelector(".popup")
    const img = popup.children[0]
    const details = popup.children[1]
    
    popup.style.display = "block"

    if(tmdbGenres.length === 0){
        fetchGenres().then((res) => {
            tmdbGenres = res
            displayGenresAndTitle(details, genres, tmdbGenres, title)
        })
    } else {
        displayGenresAndTitle(details, genres, tmdbGenres, title)
    }

    // adds the row__hovered class to row parent
    const row = e.currentTarget.parentElement.parentElement.parentElement
    row.classList.add("row__hovered")

    // defines client and parent Row element, easier to write
    const elClient = e.currentTarget.getBoundingClientRect()
    const elParentRow = e.currentTarget.parentElement.parentElement

    // Qol for navbar usage, prevents popups when MOSTLY covered by the navbar
    if(elClient.y < 30) return

    //places the popup over the hovered image
    popup.style.top = `${elParentRow.offsetTop}px`
    popup.style.left = `${elClient.left}px`
    popup.style.transition = "transform .15s ease-in"

    // resizes and changes the src of the image
    img.width = e.currentTarget.clientWidth
    img.src = baseImgUrl + (imageUrl ? imageUrl : imagePoster)
    details.style.maxWidth = `${e.currentTarget.clientWidth}px`

    // animation
    if (popUpTimeoutId) {
        clearTimeout(popUpTimeoutId)
    }
    popUpTimeoutId = setTimeout(() => {
        popup.style.opacity = "1"
        popup.style.transform = "scale(1.4)"
        popup.style.boxShadow = "0px 0px 10px 0px rgba(0,0,0,0.75)"
        popup.style.borderBottomLeftRadius = "4px"
        popup.style.borderBottomRightRadius = "4px"
        img.style.opacity = "1"
        img.style.borderBottomLeftRadius = 0
        img.style.borderBottomRightRadius = 0
        details.style.display = "block"
    }, 350)
}

const fetchGenres = async () => {
    return (await tmdb.get(request.genres)).data.genres
}

const displayGenresAndTitle = (details, genresIds, tmdbGenres, title) => {
    // set title
    const titleDiv = details.querySelector(".popup__title")
    titleDiv.innerHTML = title
    // set Genres
    const genresDiv = details.querySelector(".popup__genres")
    const filteredGenres = tmdbGenres.filter(genre => genresIds.includes(genre.id));
    genresDiv.innerHTML = ""
    filteredGenres.forEach((genre, index) => {
        const genreLink = document.createElement("a")
        genreLink.textContent = genre.name
        // genreLink.href = ""
        genreLink.classList.add("popup__genre")

        genresDiv.appendChild(genreLink)
    })
}

export default handlePopUp