import $ from "jquery";
import ComponentBase from "%classes%/ComponentBase";

export const selectorTabs = ".js-tabs";

export class Tabs extends ComponentBase {
    constructor(selector = selectorTabs) {
        super(selector);
    }

    init() {
        this.itemClass = `${selectorTabs}-item`;
        this.contentClass = `${selectorTabs}-content`;

        $(document)
            .find(this.selector)
            .on("click", this.itemClass, this.onClick.bind(this));
    }

    onClick(e) {
        const tab = $(e.target).closest(this.itemClass);
        $(this.selector)
            .find(this.itemClass)
            .removeClass("active");
        tab.addClass("active");

        const tabType = tab.data("tab");

        $(this.selector)
            .find(this.contentClass)
            .children()
            .each((i, item) => {
                const contentTab = $(item);
                console.log(contentTab);
                console.log(contentTab.data("tab-content"));
                if (contentTab.data("tab-content") === tabType) {
                    contentTab.addClass("active");
                } else {
                    contentTab.removeClass("active");
                }
            });
    }
}
