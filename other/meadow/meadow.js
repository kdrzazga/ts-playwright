var Klasa = /** @class */ (function () {
    function Klasa(p1) {
        this.p1 = p1;
        this.pole1 = p1;
        this.info = 'When you use export default before a class declaration, it means that this class is the main export of the current module. This allows you to import it without using curly braces in the importing module.';
    }
    Klasa.prototype.print = function () {
        console.log(this.pole1);
        console.log(this.info);
    };
    return Klasa;
}());
var c1 = new Klasa(1981);
c1.print();
