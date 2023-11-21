function Button(input = { /* Required and optional parameters */ }, callback) {
    let {
        x,
        y,
        // Coordinates of the button

        img,
        buttonText = "",
        // Image and text of the button

        hoverColor = hoverColor,
        overrideColor,
        // Hovercolor and a possible override color

        buttonWidth = img.width,
        buttonHeight = img.height,
        // Width and height of the button
    } = input

    // Handles button logic
    let isColliding = // "collision" detection
        scaledMouseX < x + buttonWidth / 2 &&
        scaledMouseX > x - buttonWidth / 2 &&
        scaledMouseY < y + buttonHeight / 2 &&
        scaledMouseY > y - buttonHeight / 2

    if /* The mouse */ (mouseIsPressed && isColliding) {
        /* Execute the provided */ callback() /* function */
    }

    // Renders the image
    if /* Override color exists */ (overrideColor) {
        tint(overrideColor) // Always colors the image regardless of hoverColor
    } else /* Override color does not exist */
        if /* Mouse collides with the button*/ (isColliding) {
            tint(hoverColor) //
        }
    imageMode(CENTER)
    image(img, x, y, buttonWidth, buttonHeight) // Renders the image
    noTint()
    // Responsible for rendering text
    textAlign(CENTER, CENTER)
    fill(0)
    text(buttonText, x, y) // Renders text
}

function OpenUrl(url) {
    if /* The URL is not undefined */ (url !== undefined) {
        window.open(url, "_blank")
        scaledMouseX = scaledMouseY = /* Changes the mouse position to */ 0 /* so the button isn't clicked multiple times */
    }
}