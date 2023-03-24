function Tabs() {
    textAlign(CENTER, CENTER)
    textSize(16)
    textFont(Fontin.SmallCaps)
    let tabs = ["Info", "Qualities", "Stories"]
    let buttonWidth = 1.2
    for (let i = 0; i < tabs.length; i++) {
        if (!currentTab[i]) {
            currentTab[i] = Button({
                x: 70 + ((tab.width + 12) * buttonWidth) * i,
                y: 25,
                buttonText: tabs[i],
                img: tab,
                buttonWidth: tab.width * buttonWidth,
                tintColor: color(255, 255, 0)
            })
            if (currentTab[i]) {
                for (let i2 = 0; i2 < tabs.length; i2++) {
                    if (i2 !== i) {
                        currentTab[i2] = false
                    }
                }
            }
        }
    }
}

function InfoTab() {
    imageGaz(paperstack)

    textAlign(LEFT)
    textSize(26)
    textFont(Fontin.SmallCaps)
    text("Information", 420, 60)
    textSize(15)
    textFont(Fontin.Regular)
    text("Useful information to get you started, learn more\nabout the project, or contribute.", 425, 95)

    let h = "http://"
    let g = "github.com/"
    let buttons = [{
        title: "Documentation",
        url: h + g + "MagicJinn/SSea-Story-Crafter/blob/main/Documentation.md",
        image: gitLogo
    }, {
        title: "Source Code",
        text: "Take a look at the source, make bug reports and suggest improvements!",
        url: h + g + "MagicJinn/SSea-Story-Crafter",
        image: gitLogo
    }, {
        title: "My Github",
        text: "Check out my other projects",
        url: h + g + "MagicJinn/",
        image: gitAvatar
    }]
    for (let i = 0; i < buttons.length; i++) {
        let x = 600
        let y = (story.height + 10) * i + 160
        Button({
            x: x,
            y: y,
            img: Story({
                img: buttons[i].image,
                title: buttons[i].title
            }),
            url: buttons[i].url,
            tintColor: color(255, 225, 0)
        })
    }
}