

const scraper = async () => {

const page = await newPage();

try {
    const acounts = await page.evaluate(() => {
    let accounts = [];
    const accountsElem = document.querySelectorAll("._1mm64 _3xYY7 _2Y_70 _2oPLn");
    const accountsElemLen = accountsElem.length;

    for (let i = 0; i < accountsElemLen; i++) {
      try {
        const accountsElem = accountsElem[i];
	const name = accountsElem.querySelector("._1MwNX").innerText;
	accounts.push({name});
	} catch (e) {}
}
	return accounts; });
console.log(accounts)


  } catch (e) {
	console.error("Unable to locate div", e);
	}
};

scraper();

module.exports = scraper;

//"_1mm64 _3xYY7 _2Y_70 _2oPLn"
//"_1MwNx"
