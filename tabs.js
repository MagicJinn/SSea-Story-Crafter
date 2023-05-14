function Tabs() {
    textAlign(CENTER, CENTER)
    textSize(16)
    textFont(Fontin.SmallCaps)
    const tabs = ["Info", "Qualities", "Stories", "Shops", "More"]
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
    EnhancementsLevel: [],
    EnhancementsAssociatedQualityId: [],
    EnhancementsId: []
}

const uninitialized = "undefined"

var refresh = false
let save = false

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
    */
    if (!domSetup) {
        Id = new CreateInput("Id", QuoteConvert(quality.Id))
        Name = new CreateInput("Name", QuoteConvert(quality.name))
        Description = new CreateInput("Description", quality.Description)
        Image = new CreateInput("Image", quality.Image)
        Persistent = new CreateCheckbox("Persistent", quality.Persistent)

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

        advancedMode = new CreateCheckbox("🔧 Advanced Mode", meta.advancedMode, true)
        if (meta.advancedMode) {
            Notes = new CreateInput("🔧 Notes", QuoteConvert(quality.Notes))
            Tag = new CreateInput("🔧 Tag", QuoteConvert(quality.Tag))
            Cap = new CreateInput("🔧 Cap", QuoteConvert(quality.Cap))
            UsePyramidNumbers = new CreateCheckbox("🔧 UsePyramidNumbers", quality.UsePyramidNumbers, true)
            if (quality.UsePyramidNumbers) {
                PyramidNumberIncreaseLimit = new CreateInput("└ PyramidNumberIncreaseLimit", quality.PyramidNumberIncreaseLimit)
            }

            AvailableAt = new CreateInput("🔧AvailableAt", QuoteConvert(quality.AvailableAt))
            Ordering = new CreateInput("🔧Ordering", quality.Ordering)

            IsSlot = new CreateCheckbox("🔧IsSlot", quality.IsSlot)

            if (quality.AssignToSlot == null) {
                quality.AssignToSlot = qualityDefault
            }
            AssignToSlotId = new CreateInput("🔧 AssignToSlot", QuoteConvert(quality.AssignToSlot.Id), "text", true)

            EnhancementsAmount = new CreateInput("🔧Enhancements", meta.EnhancementsAmount, "number", true)
            EnhancementsAmount.size(40, 22)

            for (let i = 0; i < meta.EnhancementsAmount; i++) {
                createDiv(`└ Enhancement ${i+1}: `)
                meta.EnhancementsLevel[i] = new CreateInput("Level", QuoteConvert(typeof quality.Enhancements[i] !== uninitialized ? quality.Enhancements[i].Level : enhancementsDefault.Level))
                meta.EnhancementsAssociatedQualityId[i] = new CreateInput("AssociatedQuality", QuoteConvert(typeof quality.Enhancements[i] !== uninitialized ? quality.Enhancements[i].AssociatedQuality.Id : enhancementsDefault.AssociatedQuality.Id))
                meta.EnhancementsId[i] = new CreateInput("Id", QuoteConvert(typeof quality.Enhancements[i] !== uninitialized ? quality.Enhancements[i].Id : enhancementsDefault.Id))
                createP() // Creates larger gap.
            }

            UseEvent = new CreateInput("🔧UseEvent", QuoteConvert(quality.UseEvent !== null ? quality.UseEvent.Id : eventDefault.Id))

            createSpan("🔧DifficultyTestType: ")
            DifficultyTestType = createSelect()
            DifficultyTestType.option("Broad")
            DifficultyTestType.option("Narrow")
            DifficultyTestType.selected(quality.DifficultyTestType)
            createDiv()

            DifficultyScaler = new CreateInput("└ DifficultyScaler", quality.DifficultyScaler)

            createSpan("🔧AllowedOn: ")
            AllowedOn = createSelect()
            AllowedOn.option("Character")
            AllowedOn.option("User")
            AllowedOn.selected(quality.AllowedOn)
            createDiv()

            LevelDescriptionText = new CreateInput("🔧LevelDescriptionText", QuoteConvert(quality.LevelDescriptionText))
            ChangeDescriptionText = new CreateInput("🔧ChangeDescriptionText", QuoteConvert(quality.ChangeDescriptionText))
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

    advancedMode.changed()

    if (meta.advancedMode) {
        if (typeof UsePyramidNumbers !== uninitialized && typeof IsSlot !== uninitialized && typeof AssignToSlotId !== uninitialized && typeof EnhancementsAmount !== uninitialized && typeof DifficultyTestType !== uninitialized && typeof AllowedOn !== uninitialized) {
            UsePyramidNumbers.changed()
            AssignToSlotId.changed()
            EnhancementsAmount.changed()
            DifficultyTestType.changed(function () {
                refresh = true
            })
            AllowedOn.changed(function () {
                refresh = true
            })
        }
    }

    if (refresh) {
        // Save meta values
        meta.advancedMode = advancedMode.value()

        // Save all quality values
        let IdValue = NullConvert(Id.value())
        quality.Id = IdValue !== null ? Number(IdValue) : IdValue
        quality.Name = NullConvert(Name.value())
        quality.Description = Description.value()
        quality.Image = Image.value()
        quality.Persistent = Persistent.value()
        quality.Nature = Nature.value()
        if (Nature.value() == "Status") {
            quality.Category = typeof CategoryStatus !== uninitialized ? CategoryStatus.value() : "Unspecified"
        } else if (Nature.value() == "Thing") {
            quality.category = typeof CategoryThing !== uninitialized ? CategoryThing.value() : "Unspecified"
        }

        if (meta.advancedMode) {
            if (typeof Notes !== uninitialized && typeof Tag !== uninitialized && typeof Cap !== uninitialized && typeof UsePyramidNumbers !== uninitialized && typeof AssignToSlotId !== uninitialized && typeof AvailableAt !== uninitialized && typeof Ordering !== uninitialized && typeof EnhancementsAmount !== uninitialized && typeof UseEvent !== uninitialized && typeof DifficultyTestType !== uninitialized && typeof DifficultyScaler !== uninitialized && typeof AllowedOn !== uninitialized && typeof LevelDescriptionText !== uninitialized && typeof ChangeDescriptionText !== uninitialized && LevelImageText !== uninitialized) {
                quality.Notes = Notes.value()
                quality.Tag = Tag.value()
                let CapValue = NullConvert(Cap.value())
                quality.Cap = CapValue !== null ? Number(CapValue) : CapValue
                quality.UsePyramidNumbers = UsePyramidNumbers.value()
                if (quality.UsePyramidNumbers && typeof PyramidNumberIncreaseLimit !== uninitialized) {
                    quality.PyramidNumberIncreaseLimit = PyramidNumberIncreaseLimit.value()
                }
                let AssignToSlotValue = NullConvert(AssignToSlotId.value())
                if (AssignToSlotValue !== null) {
                    quality.AssignToSlot = qualityDefault
                    quality.AssignToSlot.Id = Number(AssignToSlotValue)
                } else {
                    quality.AssignToSlot = AssignToSlotValue
                }
                quality.AvailableAt = NullConvert(AvailableAt.value())
                quality.Ordering = Number(Ordering.value())
                meta.EnhancementsAmount = Number(EnhancementsAmount.value())
                for (let i = 0; i < meta.EnhancementsAmount; i++) {
                    try {
                        quality.Enhancements[i].Level = Number(NullConvert(meta.EnhancementsLevel[i].value()))
                        quality.Enhancements[i].AssociatedQuality.Id = Number(NullConvert(meta.EnhancementsAssociatedQualityId[i].value()))
                        quality.Enhancements[i].Id = Number(NullConvert(meta.EnhancementsId[i].value()))
                    } catch (error) {
                        break
                    }
                }

                let UseEventValue = NullConvert(UseEvent.value())
                if (UseEventValue !== null) {
                    quality.UseEvent = eventDefault
                    quality.UseEvent.Id = Number(UseEvent.value())
                } else {
                    quality.UseEvent = UseEventValue
                }
                quality.DifficultyTestType = DifficultyTestType.value()
                quality.DifficultyScaler = Number(DifficultyScaler.value())
                quality.AllowedOn = AllowedOn.value()
                quality.LevelDescriptionText = NullConvert(LevelDescriptionText.value())
                quality.ChangeDescriptionText = NullConvert(ChangeDescriptionText.value())
                quality.LevelImageText = NullConvert(LevelImageText.value())
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
    ImageGaz(repair)
    PageTitle("Under Construction")
    PageDescription("\"I don't think this is engineering any more,\" the Mechanic confides. \"Possibly it's witchcraft. But I don't really mind.\" He rubs his hands.")
}

function ShopsTab() {
    ImageGaz()
    PageTitle()
    PageDescription()
}