class CreateInput {
    constructor(description, input, type = "text") {
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
            this.valueChanged = true;
        })

        this.heldValue.mouseOver(() => {
            this.mouseIsOut = false;
        })

        this.heldValue.mouseOut(() => {
            this.mouseIsOut = true;
        })

        if (this.valueChanged && this.mouseIsOut) {
            this.valueChanged = false;
            return true;
        } else {
            return false;
        }
    }
}

class CreateCheckbox {
    constructor(description, input) {
        createSpan()
        this.heldValue = createCheckbox(description, input)
        createDiv()
    }
    value() {
        return this.heldValue.checked()
    }
}