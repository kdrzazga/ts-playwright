class Scroller {
    constructor(step) {
        this.step = step < 0 ? window.innerHeight / 300 : step;
        this.y = 0;
        this.direction = 1;
        this.isScrolling = false;
    }

    smoothScroll() {
        this.y += this.step * this.direction;

        if (this.y >= document.body.scrollHeight - window.innerHeight || this.y <= 0) {
            this.direction *= -1;
        }

        window.scrollTo(0, this.y);

        if (this.isScrolling) {
            requestAnimationFrame(this.smoothScroll.bind(this));
        }
    }

    startScrolling() {
        if (!this.isScrolling) {
            this.isScrolling = true;
            this.smoothScroll();
        }
    }

    stopScrolling() {
        this.isScrolling = false;
    }
}
