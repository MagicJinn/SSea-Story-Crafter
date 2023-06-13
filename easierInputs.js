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
    disabled(boolean) {
        this.heldValue.elt.disabled = boolean
        if (boolean) {
            this.heldValue.value("")
            this.heldValue.style('background-color', '#D3D3D3');
            this.heldValue.style('color', 'white');
        } else {
            this.heldValue.style('background-color', '');
            this.heldValue.style('color', '');
        }
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
    disabled(boolean) {
        this.heldValue.elt.disabled = boolean
        if (boolean) {
            this.heldValue.checked(false)
            this.heldValue.style('opacity', '0.5'); // Reduce opacity for disabled state
          } else {
            this.heldValue.style('opacity', ''); // Reset opacity
          }
    }
}