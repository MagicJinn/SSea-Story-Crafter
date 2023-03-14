let currentTab = []

function setup() {
    createCanvas(book.width, book.height + tab.height)
    Scaling()
    textFont(Fontin)
    noSmooth()

    CreateDom()

    image(book, 0, 0 + tab.height)
}

function draw() {
    if (root) {}
    resizeInput(title);
    resizeInput(storyImage);
    resizeInput(teaser);
    imageMode(CORNER)
    image(pages, 0, 0 + tab.height)
    Tabs()
}

function resizeInput(input) {
    input.size(input.value().length * 7);
}