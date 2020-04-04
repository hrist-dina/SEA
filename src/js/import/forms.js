import $ from "jquery"
import {
    selectorService,
    Service,
} from "../froms/Service"

import { selectorRequestCall, RequestCall } from "../froms/RequestCall"
import { selectorSubscribe, Subscribe } from "../froms/Subscribe"

$(() => {
    $(document)
        .find(selectorService)
        .each((i, item) => {
            new Service($(item)).submit()
        })
    $(document)
        .find(selectorRequestCall)
        .each((i, item) => {
            new RequestCall($(item)).submit()
        })
    $(document)
        .find(selectorSubscribe)
        .each((i, item) => {
            new Subscribe($(item)).submit()
        })
})
