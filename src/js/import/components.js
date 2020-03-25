import $ from "jquery";
import { UiKit } from "%components%/ui-kit/ui-kit";
import PCard from "%components%/p-card/p-card";
import Card from "%components%/card/card";
import {CardsDetail} from "%components%/cards-detail/cards-detail";

$(() => {
    new Card();
    new PCard();
    new UiKit();
    new CardsDetail();
});
