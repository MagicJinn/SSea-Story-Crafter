let currentTab = []
let previousTab = []

// Catches any errors in the program and shows you a prompt
window.onerror = function (message, source, line, column, error) {
    alert("Error: " + source + "\n" + line + " " + column + " " + message + "\n\nShow me this message on the Github Issues page");
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
    } else if (currentTab[3]) {
        ShopsTab()
    } else if (currentTab[4]){
        ImageGaz()
        PageTitle()
        PageDescription()
    }
}