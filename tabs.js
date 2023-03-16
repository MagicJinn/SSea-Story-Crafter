function Tabs() {
    textAlign(CENTER, CENTER)
    textSize(16)
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
    let h = "http://"
    let g = "github.com/"
    let buttons = [{
        text: "Documentation",
        url: h + g + "MagicJinn/SSea-Story-Crafter/blob/main/Documentation.md",
        image: gitLogo
    }, {
        text: "Github Repo",
        url: h + g + "MagicJinn/SSea-Story-Crafter",
        image: gitLogo
    }, {
        text: "My Github",
        url: h + g + "MagicJinn/",
        image: gitAvatar
    }]
    for (let i = 0; i < buttons.length; i++) {
        let x = 600
        let y = (story.height + 10) * i + 120
        Button({
            x: x,
            y: y,
            img: Story({
                img: buttons[i].image,
                x: x,
                y: y
            }),
            buttonText: buttons[i].text,
            url: buttons[i].url,
            tintColor: color(255, 225, 0)
        })
    }
}