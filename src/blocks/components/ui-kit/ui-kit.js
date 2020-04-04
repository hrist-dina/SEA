import $ from "jquery"
import ComponentBase from "%classes%/ComponentBase"
import Select from "%components%/select/select"

class UiKit extends ComponentBase {
    constructor() {
        super()
    }
    init() {
        new Field()
        new Select()
    }
}

class Field extends ComponentBase {
    constructor(selector = ".js-field") {
        super(selector)
    }

    init() {
        this.fieldInput = `${this.selector}-input`
        $(document)
            .find(this.selector)
            .each((i, elem) => {
                const fieldInput = $(elem).find(this.fieldInput)
                this.initEvents(fieldInput)
            })
    }

    initEvents(elem) {
        const val = $(elem).val()
        if (val && val.length) {
            $(elem)
                .closest(this.selector)
                .addClass("active")
        }

        $(elem).on("focus", e => {
            const fieldInput = $(e.target)
            const val = fieldInput.val()
            if (!val && fieldInput.is("select")) {
                fieldInput.select2("open")
            }
            fieldInput.closest(this.selector).addClass("active")
        })

        $(elem).on("blur", e => {
            const fieldInput = $(e.target)
            const val = fieldInput.val()
            if (!val) {
                fieldInput.closest(this.selector).removeClass("active")
            }
        })

        if ($(elem).is("select")) {
            $(elem).on("change.select2", e => {
                const fieldInput = $(e.target)
                const label = fieldInput.closest(this.selector)
                if (fieldInput.val()) {
                    label.addClass("active")
                } else {
                    label.removeClass("active")
                }
            })
        }
    }
}

export { UiKit }
