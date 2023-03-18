function preload() {
    let p = "images/" //Path
    let e = ".png" // Extension
    book = loadImage(p + "book" + e)
    pages = loadImage(p + "pages" + e)
    story = loadImage(p + "story" + e)
    tab = loadImage(p + "tab" + e)
    frame = loadImage(p + "frame" + e)

    let cms = "comingsoon/comingsoon"
    placeholder = {
        small: loadImage(p + cms + "small" + e),
        default: loadImage(p + cms + e),
        gaz: loadImage(p + cms + "gaz" + e)
    }

    gitAvatar = loadImage(p + "logos/gitAvatar" + e) // http://avatars.githubusercontent.com/u/72989508
    gitLogo = loadImage(p + "logos/gitLogo" + e) // http://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png


    Fontin = { // http://eljbris.com/fontin.html
        Regular: loadFont("styles/Fontin-Regular.ttf"),
        Bold: loadFont("styles/Fontin-Bold.ttf"),
        SmallCaps: loadFont("styles/Fontin-SmallCaps.ttf")
    }
}