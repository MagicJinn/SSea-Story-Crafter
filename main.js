let currentTab = []
let previousTab = []

window.onerror = function (message, source, line, column, error) {
    alert("Error: " + message + "\n\nShow me this message on the Github Issues page");
}

function setup() {
    createCanvas(book.width, book.height + tab.height)
    frameRate(30)
    Scaling()
    UI(SETUP)
}
var domSetup = false

function draw() {
    UI(DRAW)
    if (currentTab[0]) {
        InfoTab()
    } else if (currentTab[1]) {
        QualityTab()
    } else if (currentTab[2]) {
        StoryTab()
    }
}