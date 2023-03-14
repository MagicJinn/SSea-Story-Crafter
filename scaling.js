var scaling
var scaledMouseX
var scaledMouseY

function Scaling() {
    scaling = Math.min(windowWidth / width, windowHeight / height) / 1.02 // Picks side to scale with (width or height), then removes 2 percent to prevent errors
    document.body.style.scale = scaling // Sets the html scaling to the determined scaling
}

function windowResized() {
    Scaling() // Runs scaling each time the window is resized
}

function mouseMoved() {
    // Divides the mouseX and mouseY by the scaling so inputs match up
    scaledMouseX = mouseX / scaling
    scaledMouseY = mouseY / scaling
}