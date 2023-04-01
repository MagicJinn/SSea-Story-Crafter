function SaveQuality(input = {}) {
    // When uncertain about a fields function, check the docs.
    let { // This allows for custom inputs while also having default values
        RelationshipCapable = false, // No effect, must be false
            OwnerName = "StoryCrafter", // No effect, but this makes it easy to detect mods made with StoryCrafter
            Description = null, // Description for the quality
            Image = "comingsoon", // Name of the image located in "%appdata%\..\LocalLow\Failbetter Games\Sunless Sea\images\sn\icons", without the extension or size indicator (small/gaz)
            Notes = null, // No effects, used for notes
            Tag = null, // Usually unused, useful for organising qualities
            Cap = null, // The maximum possible level a quality can have. Not supported for qualities in the Goods category (must be null)
            HimbleLevel = 0, // No effect, non nullable
            UsePyramidNumbers = false, // Attaches levelling system to qualities, where the quality must increase by a number equal to its next level for the level to increase. Not supported for qualities in the Goods category (must be null)1
            PyramidNumberIncreaseLimit = 50, // The level cap past which the quality must increase by the level cap per level gained
            AvailableAt = null, // Adds a tooltip to the quality when hovered over
            PreventNaming = false, // No effect, non nullable
            CssClasses = null, // No effect
            World = null, // No effect
            Ordering = 0, // Usually unused, determines the ordering of a list this quality might appear in. Lower numbers ome first
            IsSlot = false, // Determines whether this quality is a slot for other qualities to be assigned, non nullable
            LimitedToArea = null, // The area where you can equip/unequip this quality
            AssignToSlot = null, // The slot to which this quality can be assigned
            Persistent = false, // Whether this quality persists when you die
            QualitiesWhichAllowSecondChanceOnThis = [], // No effect
            Visible = true, // No effect
            Enhancements = [], // Which qualities this quality alters when equiped
            EnhancementsDescription = null, // No effect
            AllowsSecondChancesOnChallengesForQuality = null, // No effect
            GivesTrophy = null, // No effect
            UseEvent = null, // Event that is triggered by this interacting with this quality
            DifficultyTestType = "Broad", // Accepts "Broad" or "Narrow". Effects the way chance of success is calculated 
            DifficultyScaler = 60, // Used in the DifficultyTestType calculation. Lower means easier
            AllowedOn = "Unspecified", // Determines what kind of possessor can hold this quality. Only "User" and "Character" are used. Non nullable
            Nature = "Unspecified", // Represents the general class of the quality, non nullable
            Category = "Unspecified", // A more precise description of the quality
            LevelDescriptionText = null, // Unique descriptions for different quality levels
            ChangeDescriptionText = null, // Text displayed by the Gazetteer when the quality changes
            LevelImageText = null, // Unique images for different quality levels
            Name, // Name of your quality
            Id // Unique ID of this quality. Must be unique. Non nullable
    } = input

    let q = {
        OwnerName: OwnerName,
        Description: Description,
        Image: Image,
        Notes: Notes,
        Tag: Tag,
        Cap: Cap,
        HimbleLevel: HimbleLevel,
        UsePyramidNumbers: UsePyramidNumbers,
        PyramidNumberIncreaseLimit: PyramidNumberIncreaseLimit,
        AvailableAt: AvailableAt,
        PreventNaming: PreventNaming,
        CssClasses: CssClasses,
        World: World,
        Ordering: Ordering,
        IsSlot: IsSlot,
        LimitedToArea: LimitedToArea,
        AssignToSlot: AssignToSlot,
        Persistent: Persistent,
        QualitiesWhichAllowSecondChanceOnThis: QualitiesWhichAllowSecondChanceOnThis,
        Visible: Visible,
        Enhancements: Enhancements,
        EnhancementsDescription: EnhancementsDescription,
        AllowsSecondChancesOnChallengesForQuality: AllowsSecondChancesOnChallengesForQuality,
        GivesTrophy: GivesTrophy,
        UseEvent: UseEvent,
        DifficultyTestType: DifficultyTestType,
        DifficultyScaler: DifficultyScaler,
        AllowedOn: AllowedOn,
        Nature: Nature,
        Category: Category,
        LevelDescriptionText: LevelDescriptionText,
        ChangeDescriptionText: ChangeDescriptionText,
        LevelImageText: LevelImageText,
        Name: Name,
        Id: Id
    }
    if (q.Name == undefined || q.Id == undefined) {
        alert("Seems like you've left important qualities blank. Please recheck your inputs.")
    } else {
        CreateJson(q, "qualities")
    }
}

function SaveStory(input = {}) {
    let {} = input
    CreateJson(s, "events")
}

function CreateJson(input, name) {
    // Json magic that I do not understand
    const qualitiesArray = [input]
    jsonString = JSON.stringify(qualitiesArray, null, 2)
    blob = new Blob([jsonString], {
        type: "application/json"
    })
    url = URL.createObjectURL(blob)
    a = document.createElement("a")
    a.href = url, a.download = name + ".json", document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(url);
}