function Button(input = {}) {
    let {
        x, // X coordinate of the button
        y, // Y coordinate of the button
        img,
        buttonText = "",
        tintColor,
    } = input
    let buttonWidth = img.width
    let buttonHeight = img.height

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
    image(img, x, y) // Renders the image
    noTint()
    // Responsible for rendering text
    textAlign(CENTER, CENTER)
    fill(0)
    text(buttonText, x, y) // Renders text
    return isPressed // Returns true or false
}