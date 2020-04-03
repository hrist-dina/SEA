import $ from "jquery";

export default class Validator {
    constructor(selectorForm, needShowMessage = true) {
        if (typeof selectorForm === "string") {
            this.form = $(selectorForm);
        } else if (typeof selectorForm === "object") {
            this.form = selectorForm;
        }

        this.needShowMessage = needShowMessage;

        this.requireFiled = "validator-require";
        this.typeFiled = "validator-type";
        this.slectorAgreeFiled = "js-validator-agree";
        this.submitButton = this.form.find("[type=submit]");
        this.selectorError = "validator-error";
        this.selectorErrorMessage = "validator-error-message";
        this.messages = {
            required: "Поле обязательное для заполнения!",
            email: "Email адрес введен некорректно",
            phone: "Некорректный телефон!",
            file: "Необходимо добавить минимум один файл",
        };
    }

    get fields() {
        return this.form.children().find("input, textarea, select");
    }

    static checkEmpty(string) {
        return string === "" || string === null;
    }

    static checkEmail(string) {
        return !!string.search(/^[-._a-z0-9]+@+[a-z0-9-]+\.[a-z]{2,6}$/i);
    }

    static checkPhone(string) {
        return !!string.search(
            /^\+7\s([0-9]{3})\s([0-9]{3})-([0-9]{2})-([0-9]{2})$/i
        );
    }

    static isFile(input) {
        console.log(input);
        return input.getAttribute("type") === "file";
    }

    removeErrorMessages() {
        this.form
            .children()
            .find(`.${this.selectorErrorMessage}`)
            .remove();
        this.form
            .children()
            .find(`.${this.selectorError}`)
            .removeClass(this.selectorError);
    }

    disabledSubmit(flag = true) {
        this.submitButton.prop("disabled", flag);
    }

    showErrorMessage(item, message) {
        if (!this.needShowMessage) {
            return;
        }
        let error = $("<div class='tooltip'>")
            .addClass(this.selectorErrorMessage)
            .text(message);
        $(item).after(error);
        $(item)
            .closest(".js-field")
            .addClass(this.selectorError);
        $(item)
            .siblings(".select2")
            .addClass(this.selectorError);
    }

    validate() {
        let error = 0;
        this.fields.map((key, item) => {
            let value = $(item).val();

            if (
                $(item).data(this.requireFiled) === true &&
                this.constructor.checkEmpty(value)
            ) {
                const message = this.constructor.isFile(item)
                    ? this.messages.file
                    : this.messages.required;
                this.showErrorMessage(item, message);
                error = 1;
            }

            if (!this.constructor.checkEmpty(value)) {
                switch ($(item).data(this.typeFiled)) {
                case "email":
                    if (this.constructor.checkEmail(value)) {
                        this.showErrorMessage(item, this.messages.email);
                        error = 1;
                    }
                    break;
                case "phone":
                    if (this.constructor.checkPhone(value)) {
                        this.showErrorMessage(item, this.messages.phone);
                        error = 1;
                    }
                    break;
                default:
                    break;
                }
            }
        });

        return error;
    }

    validateAgree() {
        let that = this;

        this.form.find(`.${this.slectorAgreeFiled}`).on("change", function() {
            if ($(this).is(":checked")) {
                that.disabledSubmit(false);
            } else {
                that.disabledSubmit();
            }
        });
    }

    init() {
        this.removeErrorMessages();
        return this.validate();
    }
}
