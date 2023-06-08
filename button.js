function Button(input = {}, callback) {
    let {
        x, // X coordinate of the button
        y, // Y coordinate of the button
        img,
        buttonText = "",
        tintColor,
        buttonWidth = img.width,
        buttonHeight = img.height,
    } = input

    let isColliding = // "collision" detection
        scaledMouseX < x + buttonWidth / 2 &&
        scaledMouseX > x - buttonWidth / 2 &&
        scaledMouseY < y + buttonHeight / 2 &&
        scaledMouseY > y - buttonHeight / 2
    if (isColliding && mouseIsPressed) {
        callback()
    }
    
    // Responsible for rendering the image
    if (isColliding) { // The button is hovered over
        tint(tintColor)
    }
    imageMode(CENTER)
    image(img, x, y, buttonWidth, buttonHeight) // Renders the image
    noTint()
    // Responsible for rendering text
    textAlign(CENTER, CENTER)
    fill(0)
    text(buttonText, x, y) // Renders text

}

var linkDelay = 0

function OpenUrl(url) {
    if (url !== undefined && frameCount - linkDelay > 15) {
        window.open(url, "_blank")
        linkDelay = frameCount
        scaledMouseX = scaledMouseY = 0
    }
}