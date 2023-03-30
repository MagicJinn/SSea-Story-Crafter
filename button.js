function Button(input = {}) {
    let {
        x, // X coordinate of the button
        y, // Y coordinate of the button
        img,
        buttonText = "",
        tintColor,
        url,
        buttonWidth = img.width,
        buttonHeight = img.height,
    } = input

    let isPressed = false
    let isColliding = // "collision" detection
        scaledMouseX < x + buttonWidth / 2 &&
        scaledMouseX > x - buttonWidth / 2 &&
        scaledMouseY < y + buttonHeight / 2 &&
        scaledMouseY > y - buttonHeight / 2
    if (isColliding) { // The button is hovered over
        tint(tintColor)
        if (mouseIsPressed) { // The button is pressed
            isPressed = true
        }
    }
    // Responsible for rendering the image
    imageMode(CENTER)
    image(img, x, y, buttonWidth, buttonHeight) // Renders the image
    noTint()
    // Responsible for rendering text
    textAlign(CENTER, CENTER)
    fill(0)
    text(buttonText, x, y) // Renders text
    if (isPressed) {
        OpenUrl(url)
    }
    return isPressed // Returns true or false
}

var linkDelay = 0
function OpenUrl(url){
    if (url !== undefined && frameCount - linkDelay > 15) {
        window.open(url, "_blank")
        linkDelay = frameCount
        scaledMouseX = scaledMouseY = 0
    }
}