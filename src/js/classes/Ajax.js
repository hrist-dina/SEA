import $ from "jquery"

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

    init() {
        // Реализовать у дочернего класса
    }

    submit() {
        this.element.on("submit", e => {
            e.preventDefault()
            if (this.validate()) {
                this.post()
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
        $.ajax(this.url, {
            method: method,
            dataType: "json",
            data: this.data,
        })
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
        // Реализовать у дочернего класса
        if (data) {
            return true
        }
        return false
    }

    fail(error) {
        // Реализовать у дочернего класса
        console.log("fail")
        console.log(error)
    }
}
