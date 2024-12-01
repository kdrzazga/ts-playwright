class Petscii{
    static TRIANGLE_LEFT = 0;
}

document.addEventListener('DOMContentLoaded', function() {
    let spans = document.querySelectorAll('span[name="slash"]');
    let backslashSpans = document.querySelectorAll('span[name="backslash"]');
    spans.forEach((span) => {
        span.innerText = String.fromCharCode(0x25e2);
    });
    backslashSpans.forEach((span) => {
        span.innerText = String.fromCharCode(0x25e5);
    });

    const scroller = new Scroller(-1);
    scroller.startScrolling();

    console.log("Merry Christmas !");
});
