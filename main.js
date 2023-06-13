const TAB = {
    INFO: 0,
    QUALITY: 1,
    STORY: 2,
    SHOPS: 3,
    MORE: 4
}
var currentTab = TAB.INFO

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
    switch (currentTab) {
        case TAB.INFO:
            InfoTab()
            break
        case TAB.QUALITY:
            QualityTab()
            break
        case TAB.STORY:
            StoryTab()
            break
        case TAB.SHOPS:
            ShopsTab()
            break
        case TAB.MORE:
            ImageGaz()
            PageTitle()
            PageDescription()
            break
    }
}