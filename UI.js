const SETUP = 1
const DRAW = 2

function UI(mode) {
    switch (mode) {
        case SETUP:
            image(book, 0, 0 + tab.height)
            break;
        case DRAW:
            imageMode(CORNER)
            image(pages, 0, 0 + tab.height)
            Tabs()
            break;
    }
}