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

// I won't even pretend I wrote this
  
  function cloneDeep(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    const clonedObj = Array.isArray(obj) ? [] : {};
  
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = cloneDeep(obj[key]);
      }
    }
  
    return clonedObj;
  }
  