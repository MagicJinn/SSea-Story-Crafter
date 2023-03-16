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
        url: h + g + "MagicJinn/SSea-Story-Crafter/blob/main/Documentation.md"
    }, {
        text: "Github Repo",
        url: h + g + "MagicJinn/SSea-Story-Crafter"
    }, {
        text: "My Github",
        url: h + g + "MagicJinn/"
    }]
    for (let i = 0; i < buttons.length; i++) {
        Button({
            x: 600,
            y: (story.height + 10) * i + 120,
            img: story,
            buttonText: buttons[i].text,
            url: buttons[i].url,
            tintColor: color(255, 225, 0)
        })
    }
}