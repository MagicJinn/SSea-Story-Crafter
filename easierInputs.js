class CreateInput {
    constructor(description, input, type = "text") {
        createSpan(description)
        this.heldValue = createInput(input, type)
        createDiv()
    }
    value() {
        return this.heldValue.value()
    }
}

class CreateCheckbox {
    constructor(description, input) {
        createSpan()
        this.heldValue = createCheckbox(description, input)
        createDiv()
    }
    changed() {
        this.heldValue.changed(function () {
            return !input
        })
    }
}