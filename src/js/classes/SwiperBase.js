import $ from "jquery"
import Swiper from "swiper"

export default class SwiperBase {
    constructor(selector, options = {}) {
        this.selector = selector
        this.screenWidht = 768 // При достижении этой точки включится слайдер из десктопа в мобильный
        this.atDesctopToMobile = true
        this.needRemoveStyles = true
        this.options = options

        this.instances = []

        this.init()
    }

    init() {
        $(document)
            .find(this.selector)
            .each((i, item) => {
                this.bindOptions()
                this.instances.push({
                    el: item,
                    instance: this.initSwiper(item),
                })
            })
    }

    bindOptions(options) {
        const defaultOptions = {
            slidesPerView: "auto",
            watchOverflow: true,
        }
        this.options = { ...this.options, ...defaultOptions, ...options }
    }

    initSwiper(element) {
        if (!element) {
            element = this.selector
        }

        if (element || $(element).length) {
            if (!this.screenWidht) {
                return new Swiper(element, this.options)
            }

            let mySwiper = undefined

            $(window)
                .on("resize", () => {
                    let screenWidth = $(window).width()

                    const conditionOn = this.atDesctopToMobile
                        ? screenWidth <= this.screenWidht
                        : screenWidth >= this.screenWidht
                    const conditionOff = this.atDesctopToMobile
                        ? screenWidth > this.screenWidht
                        : screenWidth < this.screenWidht

                    if (conditionOn && mySwiper === undefined) {
                        mySwiper = new Swiper(element, this.options)
                    } else if (conditionOff && mySwiper !== undefined) {
                        mySwiper.destroy(true, false)
                        mySwiper = undefined

                        if (this.needRemoveStyles) {
                            $(element).removeAttr("style")
                            $(element)
                                .find(".swiper-slide:not(.cloned)")
                                .removeAttr("style")
                        }
                    }
                })
                .resize()

            return mySwiper
        }
    }

    filterByInstance(el) {
        return this.instances.filter(instance => instance.el === el)[0]
            ?.instance
    }
}
