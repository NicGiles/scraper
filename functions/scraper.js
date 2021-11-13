
const scraper = async () => {
  const { launchChrome } = require("./browser");
  const formatDate  = require("./formatDate");
  const fs = require("fs");
  const [newPage, exitChrome] = await launchChrome();
  const [page] = await newPage();

  if (!page) return;

  const url = "https://my.wonderbill.com/dashboard";
  console.log("Opening " + url);
  try {
    await page.goto(url, {
      waitUntil: "networkidle0",
    });
 } catch(e) {
    console.error("Unable to visit " + url, e);
    await exitChrome();
    return;
  }
    await page.click('#_evidon-accept-button');
	console.log("Logging into wonderbill dashboard")
    await page.type('input[type=email]', 'candidate+7@wonderbill.com');
    await page.type('input[type=password]', 'M/Cw?7w!G/6-');
    await page.click('button[type=submit]');
    
    await page.waitForSelector('div[data-test=manual]');
   const {accounts, dates} = await page.evaluate(() => {
      let accounts = [];
      let dates = [];
      const accountsElem = document.querySelectorAll('div[data-test=manual]');
      const accountsElemLen = accountsElem.length;

      for (let i = 0; i < accountsElemLen; i++) {
        try {
          const name = accountsElem[i].querySelector("._1MwNx").innerText;
          const amount_raw = accountsElem[i].querySelector("._2JODS").innerText;
          const amount = amount_raw.replace(/\n/gm, "");
          const due = accountsElem[i].querySelector("._2U5cr").innerText;
          const paidYearAmount = 0
	  const oustandingYearAmount = 0
	  accounts.push({name, amount, due, paidYearAmount, oustandingYearAmount});
        } catch (e) {
          console.error(e)
        }
      }

      return {accounts};
    });

  console.log('Data acquired... formatting')

	for (let i = 0; i < accounts.length; i++) {
	 const date = formatDate(accounts[i].due);
	 const due  = date.minus({month:1}).toSQLDate();
	 const month = date.month-1;
	 const amountInt = parseFloat(accounts[i].amount.substring(1))

	 accounts[i].oustandingYearAmount = '£'+((12 - month) * amountInt).toFixed(2)
	 accounts[i].paidYearAmount = '£'+(month * amountInt).toFixed(2)
	 accounts[i].due = due
	}

  console.log(accounts)

	let data = JSON.stringify(accounts);
	 fs.writeFileSync('data/accounts.json', data);
	 console.log("output saved to data/accounts.json.")
	return;
	}

module.exports = scraper

