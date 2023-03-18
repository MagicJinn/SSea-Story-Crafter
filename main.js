let currentTab = []
let previousTab = []

function setup() {
    createCanvas(book.width, book.height + tab.height)
    Scaling()
    noSmooth()
    UI(SETUP)
}
var domSetup = false

function draw() {
    UI(DRAW)
    if (currentTab[0]) {
        InfoTab()
    } else if (currentTab[1]) {
        // if (!domSetup) {
        //     let button = []
        //     let div = []
        //     for (let i = 0; i < buttonAmount; i++) {
        //         button[i] = createButton("test")
        //         button[i].mousePressed(function () {
        //             saveQuality({
        //                 OwnerName: "MyMod",
        //                 Description: "This is a new quality",
        //                 Image: "new_quality_icon",
        //                 Name: "New Quality",
        //                 Id: 6000000
        //             })
        //         })
        //         if (i % 2 == 1) {
        //             div[i] = createDiv("Another one")
        //         }
        //         domSetup = true
        //     }
        // }
    }
}

let buttonAmount = 1

function mouseClicked() {
    if (currentTab[1] == true) {
        domSetup = false
        buttonAmount++
        removeElements()
    }
}