const express = require('express');
const { chromium } = require('playwright');

const { wait } = require('./lib.cjs');
const CheckboxesPage = require('./POMs/checkboxes.cjs');
const InternetPage = require('./InternetPage');

const app = express();
const PORT = process.env.PORT || 3000;
let browser;

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
			<p><a href = 'http://localhost:3000/the-internet-basic-auth'>&nbspTest 'basic authentication'</a>https://the-internet.herokuapp.com/basic_auth</p>
			<p><a href = 'http://localhost:3000/checkboxes'>&nbspTest 'checkboxes'</a>https://the-internet.herokuapp.com/checkboxes</p>
        </body>
        </html>
    `);
});

app.get('/example-com', async (req, res) => {
    browser = await chromium.launch();
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
    browser = await chromium.launch();
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
    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const internetPage = new InternetPage(page);
    
    await internetPage.navigate('http://localhost:8080');
    const title = await internetPage.getTitle();
    
    const addButtonText = await internetPage.getAddButtonText();
    console.log('Fetched inner text from the button: ' + addButtonText);
    
    // Add 7 buttons
    await internetPage.addButtons(7);

    // Take a screenshot
    await internetPage.takeScreenshot('screenshots/the-internet.AddButton.png');
    
    // Count and click "Remove Me" buttons
    let removeMeButtonCount = await internetPage.getRemoveMeButtonCount();
    console.log('"Remove Me" buttons that appeared: ' + removeMeButtonCount);
    
    await internetPage.clickRemoveMeButtons();
    
    removeMeButtonCount = await internetPage.getRemoveMeButtonCount();
    console.log('Now the number of "Remove Me" buttons is: ' + removeMeButtonCount);
    
    await new Promise(resolve => setTimeout(resolve, 3500)); // Wait for 3.5 seconds
    await browser.close();
    
    res.send(`Title: ${title}, Add Button Text: ${addButtonText}, "Remove Me" buttons that appeared: ${removeMeButtonCount}`);
});

app.get('/the-internet-basic-auth', async (req, res) => {
    browser = await chromium.launch();
    var context = await browser.newContext();
    const page = await context.newPage();
	
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    const title = await page.title();
	console.log(`Navigated to ${title}.`);
	
	await page.screenshot({
        path: 'screenshots/creds.png',
        fullPage: true
    });
	context = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    });
	
	await page.screenshot({
        path: 'screenshots/creds.png',
        fullPage: true
    });
	
    await browser.close();
});

app.get('/checkboxes', async (req, res) => {
    if (!browser) {
        browser = await chromium.launch({ headless: false, slowMo: 100 });
    }

    const page = await browser.newPage();
    const checkboxesPage = new CheckboxesPage(page);

    await checkboxesPage.load();
    
    const title = await checkboxesPage.getTitle();
    let log = `Title of the page is: ${title}<br/>`;
    console.log(title);
    
    let checkbox1Details = await checkboxesPage.getCheckboxDetails(0);
    log += `${checkbox1Details.checkboxText} - check status is ${checkbox1Details.checkboxStatus}<br/>`;
    await page.waitForTimeout(2000);
    
    let checkbox2Details = await checkboxesPage.getCheckboxDetails(1);
    log += `${checkbox2Details.checkboxText} - check status is ${checkbox2Details.checkboxStatus}<br/>`;
    await page.waitForTimeout(2000);
    
	await checkboxesPage.clickCheckbox(1);
	await checkboxesPage.clickCheckbox(2);
	
	log += 'After clicking:<br/>';
	
	checkbox1Details = await checkboxesPage.getCheckboxDetails(0);
    log += `${checkbox1Details.checkboxText} - check status is ${checkbox1Details.checkboxStatus}<br/>`;
    await page.waitForTimeout(2000);
    
    checkbox2Details = await checkboxesPage.getCheckboxDetails(1);
    log += `${checkbox2Details.checkboxText} - check status is ${checkbox2Details.checkboxStatus}<br/>`;
    await page.waitForTimeout(2000);
	
    res.send(log);

    await page.close(); 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
