const SETUP = 1
const DRAW = 2

function UI(mode) {
    switch (mode) {
        case SETUP: // Only rendered once, can be overwritten by anything
            image(book, 0, tab.height)
            Tabs()
            break;
        case DRAW: // Always rendered
            imageMode(CORNER)
            image(pages, 0, tab.height)
            Tabs()
            if (currentTab !== previousTab) {
                previousTab = currentTab
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


var titleHeight

function PageTitle(input = "Coming Soon...") {
    textSize(26)
    textFont(Fontin.SmallCaps)
    textAlign(LEFT, TOP)

    let words = input.split(" ")
    let line = ""
    let lines = []

    for (let i = 0; i < words.length; i++) {
        let iLine = line + words[i] + " "
        let iWidth = textWidth(iLine)
        if (iWidth > 350) {
            lines.push(line)
            line = words[i] + " "
        } else {
            line = iLine
        }
    }
    lines.push(line)

    for (let i = 0; i < lines.length; i++) {
        text(lines[i], 420, textSize() * i + 50)
    }

    titleHeight = textSize() * lines.length
}

var descriptionHeight

function PageDescription(input = "Nothing awaits you. Time to leave port?") {
    textSize(16)
    textFont(Fontin.Regular)
    textAlign(LEFT, TOP)

    let words = input.split(" ")
    let line = ""
    let lines = []

    for (let i = 0; i < words.length; i++) {
        let iLine = line + words[i] + " "
        let iWidth = textWidth(iLine)
        if (iWidth > 350) {
            lines.push(line)
            line = words[i] + " "
        } else {
            line = iLine
        }
    }
    lines.push(line)

    for (let i = 0; i < lines.length; i++) {
        text(lines[i], 425, textSize() * i + titleHeight + 55)
    }

    descriptionHeight = textSize() * lines.length
}

function ImageGaz(input = placeholder.gaz) {
    image(input, 200, 310)
}

function RefreshDom() { // Removes and allows for the recreation of the DOM's
    removeElements()
    domSetup = false
}