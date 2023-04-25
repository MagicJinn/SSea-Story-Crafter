class CreateInput {
    constructor(description, input, type = "text") {
        createSpan(description + ": ")
        this.heldValue = createInput(input, type)
        createDiv()
    }
    value() {
        return this.heldValue.value()
    }
    size(x,y){
        this.heldValue.size(x, y)
    }
}

class CreateCheckbox {
    constructor(description, input) {
        createSpan()
        this.heldValue = createCheckbox(description, input)
        createDiv()
    }
    value(){
        return this.heldValue.checked()
    }
}