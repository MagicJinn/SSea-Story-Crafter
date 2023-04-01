function Tabs() {
    textAlign(CENTER, CENTER)
    textSize(16)
    textFont(Fontin.SmallCaps)
    const tabs = ["Info", "Qualities", "Stories"]
    const buttonWidth = 1.2
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
    ImageGaz(paperstack)
    PageTitle("Information")
    PageDescription("Useful information to get you started, learn more about the project, or contribute.")

    let h = "http://"
    let g = "github.com/"
    let buttons = [{
        title: "Documentation",
        teaser: "Documentation about the usage and about the code.",
        url: h + g + "MagicJinn/SSea-Story-Crafter/blob/main/docs/Usage.md",
        image: gitLogo
    }, {
        title: "Source Code",
        teaser: "Take a look at the source, make bug reports and suggest improvements!",
        url: h + g + "MagicJinn/SSea-Story-Crafter",
        image: gitLogo
    }, {
        title: "My Github",
        teaser: "Check out my other projects.",
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
                title: buttons[i].title,
                teaser: buttons[i].teaser,
                id: i
            }),
            url: buttons[i].url,
            tintColor: color(255, 225, 0)
        })
    }
}

var quality = {
    Id: "",
    Name: "",
    Description: "",
    Image: "comingsoon",
    Notes: null,
    Tag: null,
    Cap: null,
    UsePyramidNumbers: false,
    PyramidNumberIncreaseLimit: 50,
    AvailableAt: null,
    Ordering: 0,
    IsSlot: false,
    LimitedToArea: null,
    Persistent: false,
    Nature: "Unspecified",
    Category: "Unspecified",
}
var meta = {
    advancedMode: false, // Whether advancedMode is activated
    EnhancementsAmount: 0 // How many fields you have for Enhancements
}
let refresh = false
let save = false

function QualityTab() {
    ImageGaz()
    PageTitle()
    PageDescription()
    if (!domSetup) { // Create all buttons.
        createSpan("Id: ")
        Id = createInput(quality.Id)
        createDiv()

        createSpan("Name: ")
        Name = createInput(quality.Name)
        createDiv()

        createSpan("Description: ")
        Description = createInput(quality.Description)
        createDiv()

        createSpan("Image: ")
        Image = createInput(quality.Image)
        createDiv()

        createSpan()
        Persistent = createCheckbox("Persistent", quality.Persistent)
        createDiv()

        createSpan("Nature: ")
        Nature = createSelect()
        Nature.option("Unspecified")
        Nature.option("Status")
        Nature.option("Thing")
        Nature.selected(quality.Nature)
        createDiv()

        if (quality.Nature == "Status") {
            createSpan("Category: ")
            CategoryStatus = createSelect()
            CategoryStatus.option("Unspecified")
            CategoryStatus.option("Circumstance")
            CategoryStatus.option("Story")
            CategoryStatus.option("Progress")
            CategoryStatus.option("Quest")
            CategoryStatus.option("Accomplishment")
            CategoryStatus.option("BasicAbility")
            CategoryStatus.option("SpecificAbility")
            CategoryStatus.option("MinorLateral")
            CategoryStatus.selected(quality.Category)
            createDiv()
        } else if (quality.Nature == "Thing") {
            createSpan("Category: ")
            CategoryThing = createSelect()
            CategoryThing.option("Unspecified")
            CategoryThing.option("Companion")
            CategoryThing.option("Goods")
            CategoryThing.option("Ship")
            CategoryThing.option("Curiosity")
            CategoryThing.selected(quality.Category)
            createDiv()
        }

        advancedMode = createCheckbox("🔧 Advanced Mode", meta.advancedMode)
        if (meta.advancedMode) {
            createSpan("🔧 Notes: ")
            Notes = createInput(quality.Notes)
            createDiv()

            createSpan("🔧 Tag: ")
            Tag = createInput(quality.Tag)
            createDiv()

            createSpan("🔧 Cap: ")
            Cap = createInput(quality.Cap)
            createDiv()

            createSpan()
            UsePyramidNumbers = createCheckbox("🔧 UsePyramidNumbers", quality.UsePyramidNumbers)
            createDiv()

            if (quality.UsePyramidNumbers) {
                createSpan("└🔧PyramidNumberIncreaseLimit: ")
                PyramidNumberIncreaseLimit = createInput(quality.PyramidNumberIncreaseLimit)
                createDiv()
            }

            createSpan("🔧AvalableAt: ")
            AvailableAt = createInput(quality.AvailableAt)
            createDiv()

            createSpan("🔧Ordering: ")
            Ordering = createInput(quality.Ordering)
            createDiv()

            createSpan("🔧LimitedToArea: ")
            LimitedToArea = createInput(quality.LimitedToArea)
            createDiv()

            createSpan()
            IsSlot = createCheckbox("🔧IsSlot", quality.IsSlot)
            createDiv()

            if (quality.IsSlot) {
                createSpan("└🔧AssignToSlot")
                AssignToSlot = createInput(quality.AssignToSlot)
                createDiv()
            }
        }

        // Button to create the Json
        createP()
        finishButton = createButton("Create Json")
        finishButton.mouseClicked(function () {
            refresh = true
            save = true
        })
        domSetup = true
    }

    // Check for changes that require a refresh
    Persistent.changed(function () {
        quality.Persistent = !quality.Persistent
    })
    Nature.changed(function () {
        refresh = true
    })
    if (Nature == "Status") {
        CategoryStatus.changed(function () {
            refresh = true
        })
    } else if (Nature == "Thing") {
        CategoryThing.changed(function () {
            refresh = true
        })
    }

    advancedMode.changed(function () {
        meta.advancedMode = !meta.advancedMode
        refresh = true
    })
    if (meta.advancedMode) {
        try {
            UsePyramidNumbers.changed(function () {
                quality.UsePyramidNumbers = !quality.UsePyramidNumbers
                refresh = true
            })
            IsSlot.changed(function () {
                quality.IsSlot = !quality.IsSlot
                refresh = true
            })
        } catch (error) {
            console.log("I need to listen for changes of a checkbox, but the checkbox technically doesn't exist yet. Hence this error. Feel free to ignore it.")
        }
    }

    if (refresh) {
        quality.Id = Id.value()
        quality.Name = Name.value()
        quality.Description = Description.value()
        quality.Image = Image.value()
        quality.Nature = Nature.value()
        if (Nature == "Status") {
            quality.Category = CategoryStatus.value()
        } else if (Nature == "Thing") {
            quality.Category = CategoryThing.value()
        }

        if (meta.advancedMode) {
            try {
                quality.Notes = Notes.value()
                quality.Tag = Tag.value()
                quality.Cap = Cap.value()
                // quality.UsePyramidNumbers is saved somewhere else
                if (quality.UsePyramidNumbers) {
                    quality.PyramidNumberIncreaseLimit = PyramidNumberIncreaseLimit.value()
                }
                if (quality.IsSlot) {
                    quality.AssignToSlot = AssignToSlot.value()
                }
                quality.AvailableAt = AvailableAt.value()
                quality.Ordering = Ordering.value()
            } catch (error) {
                console.log("Trying to save values that don't exist yet. Ignore this error too")
            }
        }

        RefreshDom() // Refresh all DOMs
        refresh = false
    }

    if (save) {
        SaveQuality(quality)
        save = false
    }
}

function StoryTab() {
    ImageGaz(placeholder.gaz)
    PageTitle("Coming Soon...")
    PageDescription("Nothing awaits you. Time to leave port?")
}