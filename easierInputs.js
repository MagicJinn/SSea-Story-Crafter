class CreateInput {
    constructor(description, input, type = "text", changeRefreshes = false) {
        this.changeRefreshes = changeRefreshes

        createSpan(description + ": ")
        this.heldValue = createInput(input, type)
        createDiv()
    }
    value() {
        return this.heldValue.value()
    }
    size(x, y) {
        this.heldValue.size(x, y)
    }
    changed() {
        this.heldValue.changed(() => {
            this.valueChanged = true
        })
        this.heldValue.mouseOver(() => {
            this.mouseIsOut = false
        })
        this.heldValue.mouseOut(() => {
            this.mouseIsOut = true
        })
        if (this.valueChanged && this.mouseIsOut && this.changeRefreshes) {
            this.valueChanged = false
            refresh = true
        }
    }
}

class CreateCheckbox {
    constructor(description, input, changeRefreshes) {
        this.changeRefreshes = changeRefreshes

        createSpan()
        this.heldValue = createCheckbox(description, input)
        createDiv()
    }
    value() {
        return boolean(this.heldValue.checked())
    }
    changed() {
        this.heldValue.changed(() => {
            this.valueChanged = true
        })
        if (this.valueChanged && this.changeRefreshes) {
            this.valueChanged = false
            refresh = true
        }
    }
}