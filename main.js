let currentTab = []
let previousTab = []

function setup() {
    createCanvas(book.width, book.height + tab.height)
    Scaling()
    noSmooth()
    UI(SETUP)
}
var domSetup = false

function draw() {
    UI(DRAW)
    if (currentTab[0]) {
        InfoTab()
    } else if (currentTab[1]) {
        QualityTab()
    }
}