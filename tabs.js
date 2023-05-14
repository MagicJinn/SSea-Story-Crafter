function Tabs() {
    textAlign(CENTER, CENTER)
    textSize(16)
    textFont(Fontin.SmallCaps)
    const tabs = ["Info", "Qualities", "Stories", "More"]
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

    let x = 600
    for (let i = 0; i < buttons.length; i++) {
        let y = (story.height + 10) * i + titleHeight + descriptionHeight + 102
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

var quality = qualityDefault

var meta = { // Values that are used in the UI, but not passed through to the json builder
    advancedMode: false, // Whether advancedMode is activated
    AssignToSlot: null,
    EnhancementsAmount: 0, // How many fields you have for Enhancements
    // Check if the EnhancementsAmount is updated
    EnhancementsLevel: [],
    EnhancementsAssociatedQualityId: [],
    EnhancementsId: []
}

var uninitiated = "undefined"

var refresh = false
let save = false
var errors = 0 // This value just tracks how many try statements fail. Nothing to worry about.
function QualityTab() {
    /*
    All preview UI related to creating qualities.
    This contains examples of what your quality will look like when creating it.
    The preview will change depending on what kind of quality you are creating (goods, curiosities, status, etc.)
    */

    if (quality.AssignToSlot !== null) { // Check if the quality is equipable
        const DECK = 102966;
        const AUXILARY = 102967;
        const BRIDGE = 102964;
        const ENGINES = 102904;
        const FORWARD = 102968;
        const AFT = 102965;

        if ([DECK, AUXILARY, BRIDGE, ENGINES, FORWARD, AFT].includes(quality.AssignToSlot.Id)) { // Checks if it's ship equipment
            image(shipequipment, 200, 350);
            switch (quality.AssignToSlot.Id) {
                case DECK:
                    break;
                case AUXILARY:
                    break;
                case BRIDGE:
                    break;
                case ENGINES:
                    break;
                case FORWARD:
                    break;
                case AFT:
                    break;
            }
        } else {}

    } else { // Quality is not defined yet.
        ImageGaz(repair)
        PageTitle("Under Construction")
        PageDescription("\"I don't think this is engineering any more,\" the Mechanic confides. \"Possibly it's witchcraft. But I don't really mind.\" He rubs his hands.")
    }
    /*
    What follows is all code to create and refresh DOM Elements. This should probably be entirely rewritten in the future. (Update, rewrites are happening, kinda)
    Due to the nature of DOM elements, whenever a value is changed that necessitates new fields to be created (for example, advanced mode is enabled), all DOM elements need to be destroyed and recreated.
    All values in DOM elements are saved, then new elements are created containing the saved values.
    This creates a large amount of errors, since due to my limited coding knowledge, the program tries to save values that do not exist (yet). Try statements "fix" that. 
    */
    if (!domSetup) {
        Id = new CreateInput("Id", QuoteConvert(quality.Id))
        Name = new CreateInput("Name", QuoteConvert(quality.name))
        Description = new CreateInput("Description", quality.Description)
        Image = new CreateInput("Image", quality.Image)

        createSpan()
        Persistent = createCheckbox("Persistent", quality.Persistent) // REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS
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
            Notes = new CreateInput("🔧 Notes", QuoteConvert(quality.Notes))
            Tag = new CreateInput("🔧 Tag", QuoteConvert(quality.Tag))
            Cap = new CreateInput("🔧 Cap", QuoteConvert(quality.Cap))

            createSpan()
            UsePyramidNumbers = createCheckbox("🔧 UsePyramidNumbers", quality.UsePyramidNumbers) // REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS
            createDiv()
            if (quality.UsePyramidNumbers) {
                PyramidNumberIncreaseLimit = new CreateInput("└ PyramidNumberIncreaseLimit", quality.PyramidNumberIncreaseLimit)
            }

            AvailableAt = new CreateInput("🔧AvailableAt", QuoteConvert(quality.AvailableAt))
            Ordering = new CreateInput("🔧Ordering", quality.Ordering)

            createSpan()
            IsSlot = createCheckbox("🔧IsSlot", quality.IsSlot) // REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS REWRITE THIS
            createDiv()

            if (quality.AssignToSlot == null) {
                quality.AssignToSlot = qualityDefault
            }
            AssignToSlotId = new CreateInput("🔧 AssignToSlot", QuoteConvert(quality.AssignToSlot.Id))

            EnhancementsAmount = new CreateInput("🔧Enhancements", meta.EnhancementsAmount, "number")
            EnhancementsAmount.size(40, 22)

            for (let i = 0; i < meta.EnhancementsAmount; i++) {
                createDiv(`└ Enhancement ${i+1}: `)
                meta.EnhancementsLevel[i] = new CreateInput("Level", typeof quality.Enhancements[i] !== uninitiated ? QuoteConvert(quality.Enhancements[i].Level) : QuoteConvert(enhancementsDefault.Level))
                meta.EnhancementsAssociatedQualityId[i] = new CreateInput("AssociatedQuality", typeof quality.Enhancements[i] !== uninitiated ? QuoteConvert(quality.Enhancements[i].AssociatedQuality.Id) : QuoteConvert(enhancementsDefault.AssociatedQuality.Id))
                meta.EnhancementsId[i] = new CreateInput("Id", typeof quality.Enhancements[i] !== uninitiated ? QuoteConvert(quality.Enhancements[i].Id):QuoteConvert(enhancementsDefault.Id))
                createP() // Creates larger gap.
            }

            if (quality.UseEvent == undefined || quality.UseEvent == null) {
                quality.UseEvent = eventDefault
            }
            UseEvent = new CreateInput("🔧UseEvent", QuoteConvert(quality.UseEvent.Id))

            createSpan("🔧DifficultyTestType: ")
            DifficultyTestType = createSelect()
            DifficultyTestType.option("Broad")
            DifficultyTestType.option("Narrow")
            DifficultyTestType.selected(quality.DifficultyTestType)
            createDiv()

            // createSpan("└ DifficultyScaler: ")
            // DifficultyScaler = createInput(quality.DifficultyScaler)
            // createDiv()
            DifficultyScaler = new CreateInput("└ DifficultyScaler", quality.DifficultyScaler)

            createSpan("🔧AllowedOn: ")
            AllowedOn = createSelect()
            AllowedOn.option("Character")
            AllowedOn.option("User")
            AllowedOn.selected(quality.AllowedOn)
            createDiv()

            // createSpan("🔧LevelDescriptionText: ")
            // LevelDescriptionText = createInput(QuoteConvert(quality.LevelDescriptionText))
            // createDiv()
            LevelDescriptionText = new CreateInput("🔧LevelDescriptionText", QuoteConvert(quality.LevelDescriptionText))

            // createSpan("🔧ChangeDescriptionText: ")
            // ChangeDescriptionText = createInput(QuoteConvert(quality.ChangeDescriptionText))
            // createDiv()
            ChangeDescriptionText = new CreateInput("🔧ChangeDescriptionText", QuoteConvert(quality.ChangeDescriptionText))

            // createSpan("🔧LevelImageText: ")
            // LevelImageText = createInput(QuoteConvert(quality.LevelImageText))
            // createDiv()
            LevelImageText = new CreateInput("🔧LevelImageText", QuoteConvert(quality.LevelImageText))
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
            if (AssignToSlotId.changed()) {
                refresh = true
            }
            // EnhancementsAmount.changed(function () {
            //     meta.EAChanged = true
            // })
            // EnhancementsAmount.mouseOver(function () {
            //     meta.EAMouseOut = false
            // })
            // EnhancementsAmount.mouseOut(function () {
            //     meta.EAMouseOut = true
            // })
        } catch (error) {
            errors++
        }
        try {
            if (EnhancementsAmount.changed()) {
                refresh = true
                // meta.EAChanged = false
                // meta.EAMouseOut = false
            }
        } catch (error) {
            errors++
        }
        try {
            DifficultyTestType.changed(function () {
                refresh = true
            })
        } catch (error) {
            errors++
        }
        try {
            AllowedOn.changed(function () {
                refresh = true
            })
        } catch (error) {
            errors++
        }
    }

    if (refresh) {
        quality.Id = Number(NullConvert(Id.value()))
        quality.Name = NullConvert(Name.value())
        quality.Description = Description.value()
        quality.Image = Image.value()
        quality.Nature = Nature.value()
        // try {
        if (Nature.value() == "Status") {
            quality.Category = typeof CategoryStatus !== uninitiated ? CategoryStatus.value() : "Unspecified"
            //         quality.Category = CategoryStatus.value()
        } else if (Nature.value() == "Thing") {
            quality.category = typeof CategoryThing !== uninitiated ? CategoryThing.value() : "Unspecified"
            //         quality.Category = CategoryThing.value()
        }
        // } catch (error) {
        //     errors++
        // }

        if (meta.advancedMode) {
            try {
                quality.Notes = Notes.value()
            } catch (error) {
                errors++
            }
            try {
                quality.Tag = Tag.value()
            } catch (error) {
                errors++
            }
            try {
                let CapNumber = NullConvert(Cap.value())
                if (CapNumber == null) {
                    quality.Cap = CapNumber
                } else {
                    quality.Cap = Number(CapNumber)
                }
            } catch (error) {
                errors++
            }
            // quality.UsePyramidNumbers is saved somewhere else
            if (quality.UsePyramidNumbers) {
                try {
                    quality.PyramidNumberIncreaseLimit = PyramidNumberIncreaseLimit.value()
                } catch (error) {
                    errors++
                }
            }
            try {
                if (NullConvert(AssignToSlotId.value()) == undefined || NullConvert(AssignToSlotId.value()) == null) {
                    quality.AssignToSlot = null
                } else {
                    quality.AssignToSlot.Id = Number(AssignToSlotId.value())
                }
            } catch (error) {
                errors++
            }

            try {
                quality.AvailableAt = NullConvert(AvailableAt.value())
            } catch (error) {
                errors++
            }
            try {
                quality.Ordering = Number(Ordering.value())
            } catch (error) {
                errors++
            }
            try {
                meta.EnhancementsAmount = Number(EnhancementsAmount.value())
            } catch (error) {
                errors++
            }
            try {
                for (let i = 0; i < meta.Enhancements.length; i++) {
                    quality.Enhancements[i].Level = Number(NullConvert(meta.EnhancementsLevel[i].value()))
                    quality.Enhancements[i].AssociatedQuality.Id = Number(NullConvert(meta.EnhancementsAssociatedQualityId[i].value()))
                    quality.Enhancements[i].Id = Number(NullConvert(meta.EnhancementsId[i].value()))
                }
            } catch (error) {
                errors++
            }
            try {
                if (NullConvert(UseEvent.value()) == undefined || NullConvert(UseEvent.value()) == null) {
                    quality.UseEvent = null
                } else {
                    quality.UseEvent.Id = Number(UseEvent.value())
                }
            } catch (error) {
                errors++
            }
            try {
                quality.DifficultyTestType = DifficultyTestType.value()
            } catch (error) {
                errors++
            }
            try {
                quality.DifficultyScaler = Number(DifficultyScaler.value())
            } catch (error) {
                errors++
            }
            try {
                quality.AllowedOn = AllowedOn.value()
            } catch (error) {
                errors++
            }
            try {
                quality.LevelDescriptionText = NullConvert(LevelDescriptionText.value())
            } catch (error) {
                errors++
            }
            try {
                quality.ChangeDescriptionText = NullConvert(ChangeDescriptionText.value())
            } catch (error) {
                errors++
            }
            try {
                quality.LevelImageText = NullConvert(LevelImageText.value())
            } catch (error) {
                errors++
            }
        }
        RefreshDom() // Refresh all DOMs
        refresh = false
        console.log(errors)
        errors = 0
    }
    if (save) {
        SaveQuality(quality)
        save = false
    }
}

function StoryTab() {
    ImageGaz(repair)
    PageTitle("Under Construction")
    PageDescription("\"I don't think this is engineering any more,\" the Mechanic confides. \"Possibly it's witchcraft. But I don't really mind.\" He rubs his hands.")
}