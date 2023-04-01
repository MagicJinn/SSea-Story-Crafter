// Makes sure no "null"'s make it into the json
function NullConvert(input) {
    if (input == "null" || input == "") {
        return null
    } else {
        return input
    }
}

// Makes it so qualities which are null don't display as "null" in the input DOM's
function QuoteConvert(input) {
    if (input == null) {
        return ""
    } else {
        return input
    }
}