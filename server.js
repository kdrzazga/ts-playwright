const express = require('express');
const { chromium } = require('playwright');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Document Write Example</title>
        </head>
        <body>
			<p><a href = 'http://localhost:3000/example-com'>&nbspTest 'example.com</a>https://example.com'</p>
			<p><a href = 'http://localhost:3000/the-internet'>&nbspTest 'the-internet</a>https://the-internet.herokuapp.com/</p>
			<p><a href = 'http://localhost:3000/the-internet-add-remove'>&nbspTest 'the-internet Add/Remove Elements</a>https://the-internet.herokuapp.com/</p>
        </body>
        </html>
    `);
});


app.get('/example-com', async (req, res) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
	
    await page.goto('https://example.com');
    const title = await page.title();
	
	const h1Element = await page.$('h1');
    const h1Text = h1Element ? await h1Element.innerText() : 'No <h1> element found';
	const paragraph1 = await page.$('p');
    const paragraph1Text = paragraph1 ? await paragraph1.innerText() : 'No <h1> element found';
	const paragraphs = await page.$$('p');
	const paragraph2 = paragraphs[1];
	const link = await paragraph2.$('a');
	const linkText = link ? await link.getAttribute('href') : 'No link';
    const paragraph2Text = paragraph2 ? await paragraph2.innerText() : 'No <h1> element found';
	
	await page.screenshot({
        path: 'screenshots/example.com.png',
        fullPage: true
    });
	
    await browser.close();
    res.send(`Title of the page is: ${title}<br>H1 Header is: ${h1Text}`
	+ `<br/>First paragraph is:<br/>${paragraph1Text}`
	+ `<br/>Second paragraph is:<br/>${paragraph2Text}`
	+ `<br/>with link to URL:<br/>${linkText}`
	);
});

app.get('/the-internet', async (req, res) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
	
    await page.goto('https://the-internet.herokuapp.com/');
    const title = await page.title();
	
	const header = await page.$('h1')
	const h1Text = header ? await header.innerText() : 'No <h1> element found';
	
	const links = await page.$$('ul > li');
	const linksCount = links.length;
	
	await links[0].click();
	
	await page.screenshot({
        path: 'screenshots/AB-fullpage-screenshot.png',
        fullPage: true
    });
	const newPageTitle = await page.$('h3');
	
    res.send(`Title of the page is: ${title}<br/>`
		+`Header is: ${h1Text}<br/>`
		+`There are ${linksCount} links for available examples.<br/>`
		+`Clicking the first link leads to ${newPageTitle}.<br/>`
		);
	
    await browser.close();
});

app.get('/the-internet-add-remove', async (req, res) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
	
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    const title = await page.title();
	
	const addButton = await page.$('.example > button');
	const addButtonText = await addButton.innerText();
	
	for (var i = 0; i < 5; i++){
		await addButton.click();
	}
	
	await page.screenshot({
        path: 'screenshots/Add-RemoveButton5.png',
        fullPage: true
    });
	
	var delButtons = await page.$$('#elements > .added-manually');
	console.log (`There are ${delButtons.length} buttons`);
	
	for (var i =4 ; i > 2; i--){
		const btn = await delButtons[i];
		console.log(await btn.innerText());
		await btn.click();
	}
	
	await page.screenshot({
        path: 'screenshots/Add-RemoveButton2.png',
        fullPage: false
    });
	
	var delButtons2 = await page.$$('#elements > .added-manually');
	console.log (`After clicking 'Delete' there are ${delButtons2.length} buttons`);
	
    res.send(`Title of the page is: ${title}<br/>`
		+`Add Button text is: ${addButtonText}<br/>`
		);
	
    await browser.close();
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
