var x = 40;
function moveKarateka() {
    var karateka = document.getElementById('karateka');
    karateka.style.left = new String(x) + 'px';
    x++;
    requestAnimationFrame(function () { return moveKarateka(); });
    console.log('' + karateka.style.left);
}
console.log('hello');
moveKarateka();
