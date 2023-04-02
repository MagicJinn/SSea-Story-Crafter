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
    Id: null,
    Name: null,
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
    Enhancements: []
}
var meta = { // Values that are used in the UI, but not passed through to the json builder
    advancedMode: false, // Whether advancedMode is activated
    EnhancementsAmount: 0, // How many fields you have for Enhancements
    // Check if the EnhancementsAmount is updated
    EAChanged: false,
    EAMouseOut: false,
}
let refresh = false
let save = false

function QualityTab() {
    ImageGaz()
    PageTitle()
    PageDescription()
    if (!domSetup) { // Create all buttons.
        createSpan("Id: ")
        Id = createInput(QuoteConvert(quality.Id))
        createDiv()

        createSpan("Name: ")
        Name = createInput(QuoteConvert(quality.Name))
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

        if (quality.Nature !== "Unspecified") {
            createSpan("└ Category: ")
            if (quality.Nature == "Status") {
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
            } else if (quality.Nature == "Thing") {
                CategoryThing = createSelect()
                CategoryThing.option("Unspecified")
                CategoryThing.option("Companion")
                CategoryThing.option("Goods")
                CategoryThing.option("Ship")
                CategoryThing.option("Curiosity")
                CategoryThing.selected(quality.Category)
            }
            createDiv()
        }

        advancedMode = createCheckbox("🔧 Advanced Mode", meta.advancedMode)
        if (meta.advancedMode) {
            createSpan("🔧 Notes: ")
            Notes = createInput(QuoteConvert(quality.Notes))
            createDiv()

            createSpan("🔧 Tag: ")
            Tag = createInput(QuoteConvert(quality.Tag))
            createDiv()

            createSpan("🔧 Cap: ")
            Cap = createInput(QuoteConvert(quality.Cap))
            createDiv()

            createSpan()
            UsePyramidNumbers = createCheckbox("🔧 UsePyramidNumbers", quality.UsePyramidNumbers)
            createDiv()

            if (quality.UsePyramidNumbers) {
                createSpan("└ PyramidNumberIncreaseLimit: ")
                PyramidNumberIncreaseLimit = createInput(quality.PyramidNumberIncreaseLimit)
                createDiv()
            }

            createSpan("🔧AvailableAt: ")
            AvailableAt = createInput(QuoteConvert(quality.AvailableAt))
            createDiv()

            createSpan("🔧Ordering: ")
            Ordering = createInput(quality.Ordering)
            createDiv()

            createSpan("🔧LimitedToArea: ")
            LimitedToArea = createInput(QuoteConvert(quality.LimitedToArea))
            createDiv()

            createSpan()
            IsSlot = createCheckbox("🔧IsSlot", quality.IsSlot)
            createDiv()

            if (quality.IsSlot) {
                createSpan("└ AssignToSlot")
                AssignToSlot = createInput(QuoteConvert(quality.AssignToSlot))
                createDiv()
            }

            createSpan("🔧Enhancements: (WORK IN PROGRESS)")
            EnhancementsAmount = createInput(meta.EnhancementsAmount, "number")
            EnhancementsAmount.size(40, 22)
            createDiv()

            var Enhancements = []
            for (let i = 0; i < meta.EnhancementsAmount; i++) {
                Enhancements.push({
                    Level: null,
                    AssociatedQuality: {
                        RelationshipCapable: false,
                        OwnerName: "StoryCrafter",
                        Description: "",
                        Image: null,
                        Notes: null,
                        Tag: null,
                        Cap: null,
                        HimbleLevel: 0,
                        UsePyramidNumbers: false,
                        PyramidNumberIncreaseLimit: 50,
                        AvailableAt: null,
                        PreventNaming: false,
                        CssClasses: null,
                        World: null,
                        Ordering: 0,
                        IsSlot: false,
                        LimitedToArea: null,
                        AssignToSlot: null,
                        Persistent: false,
                        QualitiesWhichAllowSecondChanceOnThis: [],
                        Visible: true,
                        Enhancements: [],
                        EnhancementsDescription: null,
                        AllowsSecondChancesOnChallengesForQuality: null,
                        GivesTrophy: null,
                        UseEvent: null,
                        DifficultyTestType: "Broad",
                        DifficultyScaler: 60,
                        AllowedOn: "Unspecified",
                        Nature: "Unspecified",
                        Category: "Unspecified",
                        LevelDescriptionText: null,
                        ChangeDescriptionText: null,
                        LevelImageText: null,
                        Name: "",
                        Id: null
                    },
                    AssociatedQualityId: 0,
                    QualityName: null,
                    QualityDescription: null,
                    QualityImage: null,
                    QualityNature: null,
                    QualityCategory: null,
                    QualityAllowedOn: null,
                    Id: null
                })

                createDiv(`└ Enhancement ${i+1}: `)

                createSpan("Level: ")
                Enhancements[i].Level = createInput(NullConvert(Enhancements.Level))
                createDiv()

                createSpan("AssociatedQuality: ")
                Enhancements[i].AssociatedQuality.Id =

                createP() // Creates larger gap.
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
            EnhancementsAmount.changed(function () {
                meta.EAChanged = true
            })
            EnhancementsAmount.mouseOver(function () {
                meta.EAMouseOut = false
            })
            EnhancementsAmount.mouseOut(function () {
                meta.EAMouseOut = true
            })
        } catch (error) {
            console.log("I need to listen for changes of a checkbox, but the checkbox technically doesn't exist yet. Hence this error. Feel free to ignore it.")
        }
        if (meta.EAMouseOut && meta.EAChanged) {
            refresh = true
            meta.EAChanged = false
            meta.EAMouseOut = false
        }
    }

    if (refresh) {
        quality.Id = NullConvert(Id.value())
        quality.Name = NullConvert(Name.value())
        quality.Description = Description.value()
        quality.Image = Image.value()
        quality.Nature = Nature.value()
        try {
            if (Nature.value() == "Status") {
                quality.Category = CategoryStatus.value()
            } else if (Nature.value() == "Thing") {
                quality.Category = CategoryThing.value()
            }
        } catch (error) {
            console.log(console.log("Trying to save values that don't exist yet. Ignore this error too"))
        }

        if (meta.advancedMode) { // No code in the catch block. Cry about it.
            try {
                quality.Notes = Notes.value()
            } catch (error) {}
            try {
                quality.Tag = Tag.value()
            } catch (error) {}
            try {
                quality.Cap = Cap.value()
            } catch (error) {}
            // quality.UsePyramidNumbers is saved somewhere else
            if (quality.UsePyramidNumbers) {
                try {
                    quality.PyramidNumberIncreaseLimit = PyramidNumberIncreaseLimit.value()
                } catch (error) {}
            }
            // quality.IsSlot is saved somewhere else
            if (quality.IsSlot) {
                try {
                    quality.AssignToSlot = NullConvert(AssignToSlot.value())
                } catch (error) {}
            }
            try {
                quality.AvailableAt = NullConvert(AvailableAt.value())
            } catch (error) {}
            try {
                quality.Ordering = Ordering.value()
            } catch (error) {}
            try {
                quality.LimitedToArea = NullConvert(LimitedToArea.value())
            } catch (error) {}
            try {
                meta.EnhancementsAmount = (Number(EnhancementsAmount.value()))
                for (let i = 0; i < meta.EnhancementsAmount; i++) {
                    quality.Enhancements[i] = Enhancements[i].value()
                }
            } catch (error) {}

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