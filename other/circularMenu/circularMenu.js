var CircularMenu = /** @class */ (function () {
    function CircularMenu(items) {
        this.items = items;
    }
    CircularMenu.prototype.displayMenu = function () {
        var centerX = 200;
        var centerY = 200;
        var radius = 150;
        var angleIncrement = (2 * Math.PI) / this.items.length;
        this.items.forEach(function (item, index) {
            var angle = index * angleIncrement;
            var x = centerX + radius * Math.cos(angle);
            var y = centerY + radius * Math.sin(angle);
            var menuItem = document.createElement("div");
            menuItem.innerText = item.title;
            menuItem.classList.add("menu-item");
            menuItem.style.position = "absolute";
            menuItem.style.left = "".concat(x, "px");
            menuItem.style.top = "".concat(y, "px");
            menuItem.style.padding = "10px";
            menuItem.style.border = "1px solid black";
            menuItem.style.borderRadius = "50%";
            menuItem.style.transform = "rotate(".concat((angle * 180) / Math.PI - 90, "deg)");
            document.body.appendChild(menuItem);
            menuItem.addEventListener("click", function () {
                alert('click');
                item.action();
            });
        });
    };
    return CircularMenu;
}());
var items = [];
[
    { title: "Option 1", selected: "Option 1 selected." },
    { title: "Option 2", selected: "Option 2 chosen." },
    { title: "Option 3", selected: "Option 3 picked." },
    { title: "Option 4", selected: "Option 4 clicked." }
].forEach(function (option) {
    items.push({
        title: option.title,
        action: function () {
            console.log(option.title);
            console.log(option.selected);
        }
    });
});
var circularMenu = new CircularMenu(items);
circularMenu.displayMenu();
