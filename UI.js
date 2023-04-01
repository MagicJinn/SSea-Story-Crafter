const SETUP = 1
const DRAW = 2

function UI(mode) {
    switch (mode) {
        case SETUP: // Only rendered once, can be overwritten by anything
            image(book, 0, tab.height)
            Tabs()
            currentTab[0] = true
            break;
        case DRAW: // Always rendered
            imageMode(CORNER)
            image(pages, 0, tab.height)
            Tabs()
            if (!currentTab.every((val, i) => val === previousTab[i])) {
                previousTab = currentTab.slice()
                RefreshDom()
            }
            break;
    }
}

let combinedImage = []

function Story(input = {}) {
    let {
        img = placeholder.default,
            title = "Title (required)",
            teaser = "",
            id
    } = input

    let w = story.width
    let h = story.height
    if (combinedImage[id] == undefined) {
        combinedImage[id] = createImage(w, h)
        combinedImage[id].copy(story, 0, 0, w, h, 0, 0, w, h)
        combinedImage[id].copy(img, 0, 0, img.width, img.height, 12, 7, 40, 52)
        let textLayer = createGraphics(w, h)
        textLayer.textFont(Fontin.Bold)
        textLayer.textSize(18)
        textLayer.text(title, 65, 25)
        textLayer.textFont(Fontin.Regular)
        textLayer.textSize(15)
        textLayer.text(teaser, 65, 44, 290)
        combinedImage[id].copy(textLayer, 0, 0, w, h, 0, 0, w, h)
    }
    return combinedImage[id]
}

function PageTitle(input = "Coming Soon...") {
    textSize(26)
    textFont(Fontin.SmallCaps)
    textAlign(LEFT, TOP)
    text(input, 420, 50, 350)
}

function PageDescription(input = "Nothing awaits you. Time to leave port?") {
    textSize(16)
    textFont(Fontin.Regular)
    textAlign(LEFT, TOP)
    text(input, 425, 80, 350)
}

function ImageGaz(input = placeholder.gaz) {
    image(input, 200, 310)
}

function RefreshDom() { // Removes and allows for the recreation of the DOM's
    removeElements()
    domSetup = false
}