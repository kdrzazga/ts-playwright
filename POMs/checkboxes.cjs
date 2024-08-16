class CheckboxesPage {
    constructor(page) {
        this.page = page;
        this.checkboxLocator = '#checkboxes > input';
    }

    async getTitle() {
        return await this.page.title();
    }

    async getCheckboxDetails(checkboxIndex) {
        const checkboxSelector = `${this.checkboxLocator}:nth-of-type(${checkboxIndex + 1})`;
        const checkbox = await this.page.$(checkboxSelector);
        const checkboxText = await checkbox.evaluate(el => el.nextSibling.textContent.trim());
        const checkboxStatus = await checkbox.isChecked();
        return { checkboxText, checkboxStatus };
    }
	
	async clickCheckbox(checkboxIndex){
		const checkboxSelector = `${this.checkboxLocator}:nth-of-type(${checkboxIndex})`;
        const checkbox = await this.page.$(checkboxSelector);
		await checkbox.click();
	}

    async load() {
        await this.page.goto('https://the-internet.herokuapp.com/checkboxes');
    }
}

module.exports = CheckboxesPage;
