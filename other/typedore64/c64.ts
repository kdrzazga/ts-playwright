class Commodore64 {
  private tableContent: string[];

  constructor() {
    this.tableContent = [
      "    **** COMMODORE 64 BASIC V2 ****    ",
      "",
      " 64K RAM SYSTEM  38911 BASIC BYTES FREE ",
	  "",
	  "READY."
    ];
	for (let i = 5; i < 40; i++) {
      this.tableContent.push("");
    }
  }

  generateHtml(): string {
    const html = [];
    html.push("<table id=\"main\" bgcolor=\"#200080\">");
    this.tableContent.forEach((line) => {
      html.push("<tr><td>" + line + "</td></tr>");
    });
    html.push("</table>");
    return html.join("");
  }
}


const commodore64 = new Commodore64();
const html = commodore64.generateHtml();
const div = document.getElementById('commodore64');
div.innerHTML = html;
