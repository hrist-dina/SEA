import $ from "jquery";
import { UiKit } from "%components%/ui-kit/ui-kit";
import PCard from "%components%/p-card/p-card";
import Card from "%components%/card/card";
import { CardsDetail } from "%components%/cards-detail/cards-detail";
import Map from "%components%/map/map";
import { Tabs, selectorTabs } from "%classes%/Tabs";
import Mask from "%classes%/Mask";

$(() => {
    new Card();
    new PCard();
    new UiKit();
    new CardsDetail();
    new Map();
    new Mask().init();
    $(document)
        .find(selectorTabs)
        .each((i, item) => {
            new Tabs(item);
        });
});
