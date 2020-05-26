import SwiperBase from "%classes%/SwiperBase"

export default class PCard extends SwiperBase {
    constructor(selector = ".js-p-card") {
        super(selector)
    }
    bindOptions() {
        this.nextEl = `${this.selector}-next`
        this.prevEl = `${this.selector}-prev`
        this.screenWidht = false
        super.bindOptions({
            spaceBetween: 30,
            navigation: {
                nextEl: this.nextEl,
                prevEl: this.prevEl,
            },
            breakpoints: {
                // when window width is >= 580px
                1290: {
                    spaceBetween: 60,
                },
                580: {
                    spaceBetween: 40,
                },
            },
        })
    }
}
