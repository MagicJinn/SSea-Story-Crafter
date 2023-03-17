const SETUP = 1
const DRAW = 2

function UI(mode) {
    switch (mode) {
        case SETUP: // Only rendered once, can be overwritten by anything
            image(book, 0, 0 + tab.height)
            break;
        case DRAW: // Always rendered
            imageMode(CORNER)
            image(pages, 0, 0 + tab.height)
            Tabs()
            break;
    }
}

function Story(input = {}) {
    let {
        img,
        title = "Title (required)",
        storyText
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
    combinedImage.copy(textLayer, 0, 0, w, h, 0, 0, w, h);
    return combinedImage
}