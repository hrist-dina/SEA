import $ from "jquery"
// eslint-disable-next-line
import select2 from "select2"
// Initialise imported function as jQuery function
$.fn.select2.defaults.set("width", "100%")

export default class Select {
    constructor(selector = ".js-select", theme = "verhouse", options = {}) {
        this.selector = selector
        this.theme = theme

        this.baseOptions = {
            minimumResultsForSearch: Infinity,
            theme: this.theme,
        }

        this.options = $.extend(this.baseOptions, options)

        this.init()
    }

    init() {
        $(this.selector).select2(this.options)

        $(document).on("select2:opening select2:open", () => {
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                setTimeout(() => {
                    console.log(document.activeElement)
                    document.activeElement.blur()
                }, 1)
            }
        })
    }
}
