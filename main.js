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

    }
}

let buttonAmount = 1

function mouseClicked() {
    if (currentTab[1] == true) {
        domSetup = false
        buttonAmount++
        removeElements()
    }
}