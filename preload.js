function preload() {
    let p = "images/" //Path
    let e = ".png" // Extension
    book = loadImage(p + "book" + e)
    pages = loadImage(p + "pages" + e)
    story = loadImage(p + "story" + e)
    tab = loadImage(p + "tab" + e)
    frame = loadImage(p + "frame" + e)

    gitAvatar = loadImage(p + "gitAvatar" + e)
    gitLogo = loadImage(p + "logos/gitLogo" + e)


    Fontin = loadFont("styles/Fontin-SmallCaps.ttf") // http://eljbris.com/fontin.html
}