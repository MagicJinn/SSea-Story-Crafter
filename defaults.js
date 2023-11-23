// When uncertain about a fields function, check the docs.
const qualityDefault = { // The default values for all fields
    RelationshipCapable: false, // No effect, must be false
    OwnerName: "StoryCrafter", // No effect, but this makes it easy to detect mods made with StoryCrafter
    Description: "", // Description for the quality
    Image: "comingsoon", // Name of the image located in "%appdata%\..\LocalLow\Failbetter Games\Sunless Sea\images\sn\icons", without the extension (.png) or size indicator (small/gaz)
    Notes: null, // No effects, used for notes
    Tag: null, // Usually unused, useful for organising qualities
    Cap: null, // The maximum possible level a quality can have. Not supported for qualities in the Goods category (must be null)
    HimbleLevel: 0, // No effect, non nullable
    UsePyramidNumbers: false, // Attaches levelling system to qualities, where the quality must increase by a number equal to its next level for the level to increase. Not supported for qualities in the Goods category (must be null)
    PyramidNumberIncreaseLimit: 50, // The level cap past which the quality must increase by the level cap per level gained
    AvailableAt: null, // Adds a tooltip to the quality when hovered over
    PreventNaming: false, // No effect, non nullable
    CssClasses: null, // No effect
    World: null, // No effect
    Ordering: 0, // Usually unused, determines the ordering of a list this quality might appear in. Lower numbers come first
    IsSlot: false, // Determines whether this quality is a slot for other qualities to be assigned, non nullable
    LimitedToArea: null, // The area where you can equip/unequip this quality
    AssignToSlot: null, // The slot to which this quality can be assigned
    Persistent: false, // Whether this quality persists when you die
    QualitiesWhichAllowSecondChanceOnThis: [], // No effect
    Visible: true, // No effect
    Enhancements: null, // Which qualities this quality alters when equiped
    EnhancementsDescription: null, // No effect
    AllowsSecondChancesOnChallengesForQuality: null, // No effect
    GivesTrophy: null, // No effect
    UseEvent: null, // Event that is triggered by this interacting with this quality
    DifficultyTestType: "Broad", // Accepts "Broad" or "Narrow". Effects the way chance of success is calculated 
    DifficultyScaler: 60, // Used in the DifficultyTestType calculation. Lower means easier
    AllowedOn: "Character", // Determines what kind of possessor can hold this quality. Only "User" and "Character" are used. Non nullable
    Nature: "Unspecified", // Represents the general class of the quality, non nullable
    Category: "Unspecified", // A more precise description of the quality
    LevelDescriptionText: null, // Unique descriptions for different quality levels
    ChangeDescriptionText: null, // Text displayed by the Gazetteer when the quality changes
    LevelImageText: null, // Unique images for different quality levels
    Name: null, // Name of your quality
    Id: null // Unique ID of this quality. Must be unique. Non nullable
}

const enhancementsDefault = {
    Level: null,
    AssociatedQuality: cloneDeep(qualityDefault),
    // AssociatedQuality: qualityDefault,
    AssociatedQualityId: 0,
    QualityName: null,
    QualityDescription: null,
    QualityImage: null,
    QualityNature: null,
    QualityCategory: null,
    QualityAllowedOn: null,
    Id: null
}

const eventDefault = {
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

const exchangeDefault = {
    Name: null,
    Image: "comingsoon",
    Description: "",
    Shops: [],
    SettingIds: [],
    Id: null
}

const shopDefault = {
    Name: null,
    Image: comingsoon, // Name of the image located in "%appdata%\..\LocalLow\Failbetter Games\Sunless Sea\images\sn\icons", without the extension (.png) or size indicator (small/gaz)
    Description: "",
    Ordering: 0,
    Exchange: null, // No effect
    Availabilities:[],
    UnlockCost: [],
    Id: null
}

const AvailabilityDefault = {
    Quality: cloneDeep(qualityDefault),
    Cost: 0,
    SellPrice: 0,
    InShop: null, // No effect
    PurchaseQuality: cloneDeep(qualityDefault), // Quality used as payment (?)
    BuyMessage: null, // No effect (?)
    SellMessage: null, // No effect (?)
    SaleDescription: null, // No effect (?)
    Id: null
}