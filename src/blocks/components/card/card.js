import SwiperBase from "%classes%/SwiperBase"

export default class Card extends SwiperBase {
    constructor(selector = ".js-card") {
        super(selector)
    }
    bindOptions() {
        this.nextEl = `${this.selector}-next`
        this.prevEl = `${this.selector}-prev`
        this.screenWidht = false
        super.bindOptions({
            spaceBetween: 15,
            navigation: {
                nextEl: this.nextEl,
                prevEl: this.prevEl,
            },
            breakpoints: {
                // when window width is >= 580px
                580: {
                    spaceBetween: 48,
                }
            }
        })
    }
}
