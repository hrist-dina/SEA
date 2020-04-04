import $ from "jquery"
import { Ajax } from "%classes%/Ajax"
import { selectorModal, BaseModal } from "%classes%/BaseModal"

export const selectorSubscribe = ".js-form-subscribe"

export class Subscribe extends Ajax {
    constructor(selector = selectorSubscribe) {
        super(selector)
    }

    done(data) {
        console.log(data)
        if (data) {
            BaseModal.closeCurrent($(this.element).closest(selectorModal))
            BaseModal.openByType("success-subscribe")
        }
    }

    fail(error) {
        console.log("fail")
        console.log(error)

        //TODO:: Написать логику на бэке по обработке ошибок. То что ниже удалить!
        BaseModal.closeCurrent($(this.element).closest(selectorModal))
        BaseModal.openByType("success-subscribe")
    }
}
