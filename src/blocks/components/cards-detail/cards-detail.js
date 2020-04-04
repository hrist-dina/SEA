import $ from "jquery"
import ComponentBase from "%classes%/ComponentBase"

export class CardsDetail extends ComponentBase {
    constructor(selector = ".js-scrollto") {
        super(selector)
    }

    init() {
        $(this.selector).on("click", e => {
            let href = $(e.target)
                .closest(this.selector)
                .attr("href")

            $("html, body").animate(
                {
                    scrollTop: $(href).offset().top,
                },
                {
                    duration: 370,
                    easing: "linear",
                }
            )
        })
    }
}
