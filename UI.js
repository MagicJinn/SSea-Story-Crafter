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
                refreshDom()
            }
            break;
    }
}

function Story(input = {}) {
    let {
        img = placeholder.default,
            title = "Title (required)",
            teaser = ""
    } = input

    let w = story.width
    let h = story.height
    let combinedImage = createImage(w, h)
    combinedImage.copy(story, 0, 0, w, h, 0, 0, w, h)
    combinedImage.copy(img, 0, 0, img.width, img.height, 12, 7, 40, 52)
    let textLayer = createGraphics(w, h)
    textLayer.textFont(Fontin.Bold)
    textLayer.textSize(18)
    textLayer.text(title, 65, 25)
    textLayer.textFont(Fontin.Regular)
    textLayer.textSize(15)
    textLayer.text(teaser,65,44,290)
    combinedImage.copy(textLayer, 0, 0, w, h, 0, 0, w, h);
    return combinedImage
}

function imageGaz(input = placeholder.gaz){
    image(input,200,310)
}

function refreshDom(){ // Removes and allows for the recreation of the DOM's
    removeElements()
    domSetup = false
}