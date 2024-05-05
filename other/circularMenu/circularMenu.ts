interface MenuItem {
  title: string;
  action: () => void;
}

class CircularMenu {
  private items: MenuItem[];

  constructor(items: MenuItem[]) {
    this.items = items;
  }

  displayMenu() {
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    const angleIncrement = (2 * Math.PI) / this.items.length;

    this.items.forEach((item, index) => {
      const angle = index * angleIncrement;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const menuItem = document.createElement("div");
      menuItem.innerText = item.title;
	  menuItem.classList.add("menu-item");
      menuItem.style.position = "absolute";
      menuItem.style.left = `${x}px`;
      menuItem.style.top = `${y}px`;
      menuItem.style.padding = "10px";
      menuItem.style.border = "1px solid black";
      menuItem.style.borderRadius = "50%";
	  menuItem.style.transform = `rotate(${(angle * 180) / Math.PI - 90}deg)`;
      document.body.appendChild(menuItem);

      menuItem.addEventListener("click", () => {
		alert('click');
        item.action();
      });
    });
  }
}

var items: MenuItem[] = [];
[
  {title: "Option 1", selected: "Option 1 selected."},
  {title: "Option 2", selected: "Option 2 chosen."},
  {title: "Option 3", selected: "Option 3 picked."},
  {title: "Option 4", selected: "Option 4 clicked."}
].forEach((option) => {
  items.push({
    title: option.title,
    action: () => {
      console.log(option.title);
      console.log(option.selected);
    }
  })});


const circularMenu = new CircularMenu(items);


circularMenu.displayMenu();
