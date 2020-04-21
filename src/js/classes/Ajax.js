import $ from "jquery"
import { BaseModal, selectorModal } from "%classes%/BaseModal"

export const baseFeedbackUrl = "/local/script/feedback.php"

export class Ajax {
    constructor(selector) {
        this.selector = selector
        if (typeof this.selector === "string") {
            this.element = $(document).find(this.selector)
        } else if (typeof this.selector === "object") {
            this.element = this.selector
        }

        this._data = {}

        this.init()
    }

    get data() {
        if ($.isEmptyObject(this._data)) {
            return this.element.serialize()
        }
        return this._data
    }

    set data(value) {
        this._data = value
        return this
    }

    get url() {
        const dataAction = this.element.data("action")
        if (dataAction) {
            return dataAction
        }
        return this.element.attr("action")
    }

    get isFormData() {
        return false
    }

    getOptions(method) {
        let defaultOptions = {
            method: method,
            cache: false,
            processData: false,
            data: this.data,
        }

        if (this.isFormData) {
            defaultOptions = {
                ...defaultOptions,
                contentType: false,
                enctype: "multipart/form-data",
            }
        } else {
            defaultOptions = { ...defaultOptions, dataType: "json" }
        }
        return defaultOptions
    }

    init() {
        // Реализовать у дочернего класса
    }

    needShowLoader() {
        return true
    }

    submit() {
        this.element.on("submit", e => {
            e.preventDefault()
            if (this.validate()) {
                this.post()
                if (this.needShowLoader()) {
                    this.showLoader()
                }
            } else {
                console.log("validated - false")
            }
        })
        return this
    }

    validate() {
        return true
    }

    onChange() {
        this.element.on("change", e => {
            e.preventDefault()
            this.get()
        })
        return this
    }

    ajax(method) {
        $.ajax(this.url, this.getOptions(method))
            .done(this.done.bind(this))
            .fail(this.fail.bind(this))
    }

    post() {
        this.ajax("post")
        return this
    }

    get() {
        this.ajax("get")
        return this
    }

    done(data) {
        this.hideLoader()
        // Реализовать у дочернего класса
        return !!data
    }

    fail() {
        this.hideLoader()
        // Реализовать у дочернего класса

        if (window.location.hostname === "localhost") {
            //TODO:: Нужно для демонстрации верстки
            BaseModal.closeCurrent($(this.element).closest(selectorModal))
            BaseModal.openByType("success-callback")
        }
    }

    getSubmitButton() {
        return this.element.find("button[type=submit]")
    }
    showLoader() {
        this.getSubmitButton().addClass("button--loading")
    }

    hideLoader() {
        this.getSubmitButton().removeClass("button--loading")
    }
}
