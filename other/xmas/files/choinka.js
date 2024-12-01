class Petscii{
    static TRIANGLE_LEFT = 0;
}

const step = window.innerHeight / 300;
let y = 0;
let direction = 1;

function smoothScroll() {
    y += step * direction;
    
    if (y >= document.body.scrollHeight - window.innerHeight || y <= 0) {
        direction *= -1;
    }
    
    window.scrollTo(0, y);
    requestAnimationFrame(smoothScroll);
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

    console.log("Merry Christmas !");
    smoothScroll();
});
