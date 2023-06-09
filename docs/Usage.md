<h1 align="center">Usage</h1>

Looking for documentation about the code? [Check Documentation!](Documentation.md)

# Contents

- 1 - [Fields](#fields)
  - 1.1 [Qualities](#qualities)
  - 1.2 [Stories (WIP)](#stories)
- 2 - [Step by Step](#step-by-step)
  - 2.1 [Crafting a Quality](#crafting-a-quality)
    - [Goods](#goods)
    - [Curiosities](#curiosities)
    - [Officers](#officers)
  - 2.2 [Crafting a Story (WIP)](#crafting-a-story)

# Fields

Every field has their own specific data that it requires. These are described here.

## Qualities

**Id**: Your quality must have a unique number. All vanilla Id's are numbers below 200.000, so it's not recommended to go below this. Pick an arbitrarily high number for this.

<sup>tip: Properly note the Id's of your quality in a word/txt file. This will help you later</sup>

**Name**: Give your quality a name.

**Description**: Give your quality a description.

**Image**: The image for your quality. Image must:

1. have small behind the name (`examplesmall.png`)
2. be a .png
3. be `40x52` in size

This field requires the name of the image **without** `small` and `.png`

**Persistent**: Does this quality stay with your captain when they die? If yes, check this box.

**Nature**: The class of the quality. Can be either "Status", "Thing" or "Unspecified".

**Category:**

When Nature is "Status":

- Unspecified
- Circumstance
- Story
- Progress
- Quest
- Accomplishment
- BasicAbility
- SpecificAbility
- MinorLateral

When Nature is "Thing":

- Companion
- Goods
- Ship
- Curiosity

## Stories

# Step by step

Don't want to learn the intricacies of the program or the code? You can follow these step by step tutorials on how to get exactly what you want!

<sup>tip: If a field is not mentioned in the guide, then leave it at it's default value.</sup>

## Crafting a Quality

### **Goods**

Goods are items that are stored in your hold. They take up hold space and can sometimes be jettisoned. They are usually trade goods or consumables.

Here are all the fields you need to make a goods quality:

**Id**: Unique Id Number<br>
**Name**: Name of the quality<br>
**Description**: Description for the quality<br>
**Image**: The name of your image, without the *small* and without the extension (.png)<br>
**Nature**: Select *Thing*<br>
**Category**: Select *Goods*<br>

**Advanced options**:<br>
**AvailableAt**: Adds a tooltip to the quality when hovered over<br>
**Ordering**: Determines the ordering of a list this quality might appear in. <sup>(Lower numbers come first)</sup><br>
**UseEvent**: The Id of the event that gets triggered when you interact with this quality. <sup>[example](http://sunlesssea.fandom.com/wiki/Strategic_Information)</sup><br>

**When all fields are filled, click Create Json**

### **Curiosities**

Curiosities are miscellaneous items that do not take up hold space. They can be tradeable goods, abstract concepts like secrets, tales and information.

Here are all the fields you need to make a curiosities quality:

**Id**: Unique Id Number<br>
**Name**: Name of the quality<br>
**Description**: Description for the quality<br>
**Image**: The name of your image, without the *small* and without the extension (.png)<br>
**Nature**: Select *Thing*<br>
**Category**: Select *Curiosity*<br>

**Advanced options**:<br>
**UsePyramidNumbers**: Attaches levelling system to qualities, where the quality must increase by a number equal to its next level for the level to increase. <sup>[example](https://sunlesssea.fandom.com/wiki/Favours:_Antiquarian)</sup><br>
**PyramidNumberIncreaseLimit**: The level cap past which the quality must increase by the level cap per level gained.<br>
**AvailableAt**: Adds a tooltip to the quality when hovered over<br>
**Ordering**: Determines the ordering of a list this quality might appear in. <sup>(Lower numbers come first)</sup><br>
**UseEvent**: The Id of the event that gets triggered when you interact with this quality. <sup>[example](http://sunlesssea.fandom.com/wiki/Strategic_Information)</sup><br>

**When all fields are filled, click Create Json**

### **Officers**

## Crafting a Story
