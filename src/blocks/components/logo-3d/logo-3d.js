import $ from "jquery"
import ComponentBase from "%classes%/ComponentBase"

export default class Logo3d extends ComponentBase {
    constructor(selector = ".logo-3d") {
        super(selector)
    }

    init() {
        setTimeout(() => {
            $(document)
                .find(this.selector)
                .removeClass("active")
        }, 2000)
    }
}
