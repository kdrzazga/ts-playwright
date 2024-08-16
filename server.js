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
			<p><a href = 'http://localhost:3000/example-com'>Test 'example.com</a>https://example.com'</p>
			<p><a href = 'http://localhost:3000/the-internet'>Test 'the-internet</a>https://the-internet.herokuapp.com/</p>
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
	//await page.waitForLoadState('DOMContentLoaded');
	await page.waitForSelector('h1');
	
	const links = await page.$$('h1')
    res.send(`Title of the page is: ${title}\n There are ${links.lenght} links on the page`);
	
    await browser.close();
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
