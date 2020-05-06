import $ from "jquery"
import { UiKit } from "%components%/ui-kit/ui-kit"
import PCard from "%components%/p-card/p-card"
import Card from "%components%/card/card"
import { CardsDetail } from "%components%/cards-detail/cards-detail"
import Map from "%components%/map/map"
import { Tabs, selectorTabs } from "%classes%/Tabs"
import Mask from "%classes%/Mask"
import Logo3d from "%components%/logo-3d/logo-3d"
import { ScrollToUp } from "%classes%/ScrollToUp"

$(() => {
    new Card()
    new PCard()
    new UiKit()
    new CardsDetail()
    new Map()
    new Mask().init()
    new Logo3d()
    new ScrollToUp()
    $(document)
        .find(selectorTabs)
        .each((i, item) => {
            new Tabs(item)
        })
})
