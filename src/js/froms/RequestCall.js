import $ from "jquery"
import { Ajax } from "%classes%/Ajax"
import Validator from "%classes%/Validator"
import { selectorModal, BaseModal } from "%classes%/BaseModal"

export const selectorRequestCall = ".js-form-request-call"

export class RequestCall extends Ajax {
    constructor(selector = selectorRequestCall) {
        super(selector)
    }

    validate() {
        return !new Validator(this.element).init()
    }

    done(data) {
        console.log(data)
        if (data) {
            BaseModal.closeCurrent($(this.element).closest(selectorModal))
            BaseModal.openByType("success-callback")
        }
        this.hideLoader()
    }
}
