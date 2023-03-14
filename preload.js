function preload() {
    let p = "images/" //Path
    let e = ".png" // extension
    book = loadImage(p + "book" + e)
    pages = loadImage(p + "pages" + e)
    story = loadImage(p + "story" + e)
    tab = loadImage(p + "tab" + e)

    Fontin = loadFont("styles/Fontin-SmallCaps.ttf") // http://eljbris.com/fontin.html
}