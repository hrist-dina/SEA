import $ from "jquery";
import ComponentBase from "%classes%/ComponentBase";

export default class Header extends ComponentBase {
    constructor(selector = ".js-header") {
        super(selector);
    }

    init() {
        this.classMenuOpen = `${this.selector}-menu-open`;
        $(this.classMenuOpen).on("click", this.clickMenuOpen.bind(this));
    }

    clickMenuOpen(e) {
        const el = $(e.target);
        el.toggleClass("active").removeClass("active-fixed");
        el.closest(this.selector).toggleClass("active");
        el.closest("body").toggleClass("o-hidden");
    }
}
