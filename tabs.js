function Tabs() {
    textAlign(CENTER, CENTER)
    textSize(16)
    let tabs = ["Info", "Qualities", "Stories"]
    for (let i = 0; i < tabs.length; i++) {
        if (!currentTab[i]) {
            currentTab[i] = Button({
                x: 70 + (tab.width + 12) * i,
                y: 25,
                buttonText: tabs[i],
                img: tab
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