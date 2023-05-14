function SaveQuality(input) {
    if (input.Name == undefined || input.Id == undefined) {
        alert("Seems like you've left important qualities blank. Please recheck your inputs.")
    } else {
        CreateJson(input, "qualities")
    }
}

function SaveStory(input) {
    CreateJson(input, "events")
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