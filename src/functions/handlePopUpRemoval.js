import { popUpTimeoutId } from "./handlePopUp"

const handlePopUpRemoval = () => {
    if (popUpTimeoutId) {
        clearTimeout(popUpTimeoutId)
    }

    // hides the popup
    const popup = document.querySelector(".popup")
    const img = popup.children[0]
    const details = popup.children[1]

    // reset styles
    popup.style.display = "none"
    popup.style.transition = "none"
    popup.style.boxShadow = "none"
    popup.style.transform = "scale(1)"
    popup.style.opacity = "0"
    img.style.opacity = "0"
    img.style.borderBottomLeftRadius = "4px"
    img.style.borderBottomRightRadius = "4px"
    details.style.display = "none"

    //takes away the hovered class
    const hoveredRow = document.querySelectorAll(".row__hovered")
    hoveredRow.forEach(row => row.classList.remove("row__hovered"))
}

export default handlePopUpRemoval