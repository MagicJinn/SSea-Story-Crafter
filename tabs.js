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
    AssignToSlot: null,
    // LimitedToArea: null,
    Persistent: false,
    Nature: "Unspecified",
    Category: "Unspecified",
    Enhancements: [],
    UseEvent: null,
    DifficultyTestType: "Broad",
    DifficultyScaler: 60,
    AllowedOn: "Character",
    LevelDescriptionText: null,
    ChangeDescriptionText: null,
    LevelImageText: null,
}
var meta = { // Values that are used in the UI, but not passed through to the json builder
    advancedMode: false, // Whether advancedMode is activated
    AssignToSlot: null,
    EnhancementsAmount: 0, // How many fields you have for Enhancements
    // Check if the EnhancementsAmount is updated
    EAChanged: false,
    EAMouseOut: false,
    Enhancements: null,
}
var refresh = false
let save = false
var errors = 0 // This value just tracks how many try statements fail. Nothing to worry about.
function QualityTab() {
    ImageGaz(repair)
    PageTitle("Under Construction")
    PageDescription("\"I don't think this is engineering any more,\" the Mechanic confides. \"Possibly it's witchcraft. But I don't really mind.\" He rubs his hands.")
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

            // createSpan("🔧LimitedToArea: ")
            // LimitedToArea = createInput(QuoteConvert(quality.LimitedToArea))
            // createDiv()

            createSpan()
            IsSlot = createCheckbox("🔧IsSlot", quality.IsSlot)
            createDiv()

            if (quality.IsSlot) {
                meta.AssignToSlot = {
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
                }
                if (quality.AssignToSlot == null) {
                    quality.AssignToSlot = meta.AssignToSlot
                }
                createSpan("└ AssignToSlot")
                meta.AssignToSlot.Id = createInput(QuoteConvert(quality.AssignToSlot.Id))
                createDiv()
            }

            createSpan("🔧Enhancements: ")
            EnhancementsAmount = createInput(meta.EnhancementsAmount, "number")
            EnhancementsAmount.size(40, 22)
            createDiv()

            meta.Enhancements = []
            for (let i = 0; i < meta.EnhancementsAmount; i++) {
                meta.Enhancements[i] = {
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
                }
                if (quality.Enhancements[i] == undefined) {
                    quality.Enhancements[i] = meta.Enhancements[i]
                }
                createDiv(`└ Enhancement ${i+1}: `)
                try {
                    createSpan("Level: ")
                    meta.Enhancements[i].Level = createInput(QuoteConvert(quality.Enhancements[i].Level))
                    createDiv()

                    createSpan("AssociatedQuality: ")
                    meta.Enhancements[i].AssociatedQuality.Id = createInput(QuoteConvert(quality.Enhancements[i].AssociatedQuality.Id))
                    createDiv()

                    createSpan("Id: ")
                    meta.Enhancements[i].Id = createInput(QuoteConvert(quality.Enhancements[i].Id))
                    createDiv()

                    createP() // Creates larger gap.
                } catch (error) {
                    errors++
                }
            }

            if (quality.UseEvent == undefined || quality.UseEvent == null) {
                quality.UseEvent = {
                    ChildBranches: [],
                    ParentBranch: null,
                    QualitiesAffected: [],
                    QualitiesRequired: [],
                    Image: null,
                    Description: null,
                    Tag: null,
                    ExoticEffects: null,
                    Note: null,
                    ChallengeLevel: 0,
                    UnclearedEditAt: null,
                    LastEditedBy: null,
                    Ordering: 0,
                    ShowAsMessage: false,
                    LivingStory: null,
                    LinkToEvent: null,
                    Deck: null,
                    Category: "Unspecialised",
                    LimitedToArea: null,
                    World: null,
                    Transient: false,
                    Stickiness: 0,
                    MoveToAreaId: 0,
                    MoveToArea: null,
                    MoveToDomicile: null,
                    SwitchToSetting: null,
                    FatePointsChange: 0,
                    BootyValue: 0,
                    LogInJournalAgainstQuality: null,
                    Setting: null,
                    Urgency: "Normal",
                    Teaser: null,
                    OwnerName: null,
                    DateTimeCreated: null,
                    Distribution: 0,
                    Autofire: true,
                    CanGoBack: false,
                    Name: null,
                    Id: null
                }
            }
            createSpan("🔧UseEvent: ")
            UseEvent = createInput(QuoteConvert(quality.UseEvent.Id))
            createDiv()

            createSpan("🔧DifficultyTestType: ")
            DifficultyTestType = createSelect()
            DifficultyTestType.option("Broad")
            DifficultyTestType.option("Narrow")
            DifficultyTestType.selected(quality.DifficultyTestType)
            createDiv()

            createSpan("└ DifficultyScaler: ")
            DifficultyScaler = createInput(quality.DifficultyScaler)
            createDiv()

            createSpan("🔧AllowedOn: ")
            AllowedOn = createSelect()
            AllowedOn.option("Character")
            AllowedOn.option("User")
            AllowedOn.selected(quality.AllowedOn)
            createDiv()

            createSpan("🔧LevelDescriptionText: ")
            LevelDescriptionText = createInput(QuoteConvert(quality.LevelDescriptionText))
            createDiv()

            createSpan("🔧ChangeDescriptionText: ")
            ChangeDescriptionText = createInput(QuoteConvert(quality.ChangeDescriptionText))
            createDiv()

            createSpan("🔧LevelImageText: ")
            LevelImageText = createInput(QuoteConvert(quality.LevelImageText))
            createDiv()

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
            errors++
        }
        if (meta.EAMouseOut && meta.EAChanged) {
            refresh = true
            meta.EAChanged = false
            meta.EAMouseOut = false
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
        try {
            if (Nature.value() == "Status") {
                quality.Category = CategoryStatus.value()
            } else if (Nature.value() == "Thing") {
                quality.Category = CategoryThing.value()
            }
        } catch (error) {
            errors++
        }

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
                if (NullConvert(Cap.value() == null)) {
                    quality.Cap = NullConvert(Cap.value())
                } else {
                    quality.Cap = Number(NullConvert(Cap.value()))
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
            // quality.IsSlot is saved somewhere else
            if (quality.IsSlot) {
                try {
                    quality.AssignToSlot = meta.AssignToSlot
                    quality.AssignToSlot.Id = Number(NullConvert(meta.AssignToSlot.Id.value()))
                } catch (error) {
                    errors++
                }
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
            // try {
            //     quality.LimitedToArea = NullConvert(LimitedToArea.value())
            // } catch (error) {errors++}
            try {
                meta.EnhancementsAmount = Number(EnhancementsAmount.value())
            } catch (error) {
                errors++
            }
            try {
                quality.Enhancements = meta.Enhancements
                for (let i = 0; i < meta.Enhancements.length; i++) {
                    quality.Enhancements[i].Level = Number(NullConvert(meta.Enhancements[i].Level.value()))
                    quality.Enhancements[i].AssociatedQuality.Id = Number(NullConvert(meta.Enhancements[i].AssociatedQuality.Id.value()))
                    quality.Enhancements[i].Id = Number(NullConvert(meta.Enhancements[i].Id.value()))
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
    ImageGaz()
    PageTitle()
    PageDescription()
}