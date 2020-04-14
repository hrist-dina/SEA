import $ from "jquery"
import { Ajax } from "%classes%/Ajax"
import Validator from "%classes%/Validator"
import { selectorModal, BaseModal } from "%classes%/BaseModal"
import { formatBytes } from "%common%/formatters"
import { selectorField } from "%components%/ui-kit/ui-kit"

export const selectorService = ".js-form-service"

export class Service extends Ajax {
    constructor(selector = selectorService) {
        super(selector)
    }

    init() {
        this.initFileEvents()
    }

    get url() {
        return "/local/script/feedback.php"
    }

    get isFormData() {
        return true
    }

    get data() {
        let formData = new FormData(this.element[0])

        this.files.forEach((item) => {
            formData.delete(item.name)
            item.data.forEach((file) => {
                formData.append(item.name, file)
            })
        })
        return formData
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
    }

    fail(error) {
        console.log("fail")
        console.log(error)

        //TODO:: Написать логику на бэке по обработке ошибок. То что ниже удалить!
        BaseModal.closeCurrent($(this.element).closest(selectorModal))
        BaseModal.openByType("success-callback")
    }

    initFileEvents() {
        this.selectorField = selectorField
        this.fieldFileInput = `${this.selectorField} input[type='file']`
        this.fieldParent = `${this.selectorField}-parent`

        this.fileList = ".js-file-list"
        this.fileItem = ".js-file-item"

        this.files = []

        $(this.selector).on(
            "change",
            this.fieldFileInput,
            this.onChangeFile.bind(this)
        )
        $(this.selector).on(
            "click",
            `${this.selectorField}-delete`,
            this.onDelete.bind(this)
        )
    }

    findFiles(name) {
        return this.files.filter(
            fileItem => fileItem.name === name
        )[0]
    }

    onChangeFile(e) {
        e.preventDefault()
        const label = $(e.target).closest(this.selectorField)
        label.parent().addClass(this.fieldParent.slice(1))
        const files = Array.from(e.target.files)

        const name = $(e.target).attr("name")
        const findData = this.findFiles(name)

        if (findData) {
            findData.data = findData.data.concat(files)
        } else {
            this.files = [
                ...this.files,
                {
                    name: name,
                    data: files,
                },
            ]
        }

        this.renderFileList(this.findFiles(name).data, label)
        this.validate()
        return false
    }

    onDelete(e) {
        const icon = $(e.target)
        const input = icon
            .closest(this.fieldParent)
            .find(this.fieldFileInput)[0]

        const item = icon.closest(this.fileItem)
        const list = icon.closest(this.fileList)
        const name = $(input).attr("name")
        let findData = this.findFiles(name)
        list.find(this.fileItem).each((index, elem) => {
            if (elem === item[0] && findData) {
                findData.data.splice(index, 1)
            }
        })
        const label = $(input).closest(this.selectorField)
        this.renderFileList(findData.data, label)
        if (!findData.data.length) {
            $(input).val("")
        }
        this.validate()
    }

    renderFileList(files, label) {
        const lisTemp = $(`<div class='field-file__list ${this.fileList.slice(1)}'></div>`)
        const list = label.siblings(lisTemp).length
            ? label.siblings(lisTemp)
            : lisTemp
        list.html("")
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                const item = files[i]
                const fileData = this.renderFileData(item)
                list.append(fileData)
            }
            label.after(list)
        } else {
            label.find(list).remove()
        }
    }

    renderFileData(data) {
        // prettier-ignore
        return `<div class="field-file__item ${this.fileItem.slice(1)}">
                <div class="field-file__data">
                    <div class="field-file__name">${data.name}</div>    
                    <div class="field-file__size">${formatBytes(data.size)}</div> 
                </div>   
                <div class="field-file__delete js-field-delete">
                    <i class="icon icon-delete"></i>
                </div>
            </div>`
    }
}
