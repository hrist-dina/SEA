import $ from "jquery";
import ComponentBase from "%classes%/ComponentBase";

export default class Header extends ComponentBase {
    constructor(selector = ".js-header") {
        super(selector);
    }

    init() {
        this.classMenuOpen = `${this.selector}-menu-open`;

        this.classSearch = `${this.selector}-search`;
        this.classSearchOpen = `${this.classSearch}-open`;
        this.classSearchClose = `${this.classSearch}-close`;

        $(this.classMenuOpen).on("click", this.clickMenuOpen.bind(this));
        $(this.classSearchOpen).on("click", this.clickSearchOpen.bind(this));
        $(this.classSearchClose).on("click", this.clickSearchClose.bind(this));
    }

    clickMenuOpen(e) {
        const el = $(e.target);
        el.toggleClass("active").removeClass("active-fixed");
        el.closest(this.selector).toggleClass("active");
        el.closest("body").toggleClass("o-hidden");
    }

    clickSearchOpen(e) {
        const el = $(e.target);
        el.closest(this.classSearch).addClass("active");
    }

    clickSearchClose(e) {
        const el = $(e.target);
        el.closest(this.classSearch).removeClass("active");
    }
}
