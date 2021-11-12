
const login = async () => {
  const { launchChrome } = require("./browser");
  const formatDate  = require("./formatDate");

  const [newPage, exitChrome] = await launchChrome();
  const [page] = await newPage();

  if (!page) return;

  // Flow 2 => Visiting  wonderbill's dashboard
  const url = "https://my.wonderbill.com/dashboard";
  console.log("Opening " + url);
  try {
    await page.goto(url, {
      waitUntil: "networkidle0", // wait till all network requests has been processed
    });
 } catch(e) {
    console.error("Unable to visit " + url, e);
    await exitChrome(); // close chrome on error
    return; // exiting the function
  }
    await page.click('#_evidon-accept-button');

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
          dates.push({due});
        } catch (e) {
          console.error(e)
        }
      }

      return {accounts, dates};
    });

  console.log(accounts);
  console.log(dates);

//working date function but need to take 1 month off.
for (let i = 0; i < accounts.length; i++) {
//accounts[i].due = formatDate(accounts[i].due)
console.log(accounts)


const date = formatDate(accounts[i].due);
const due  = date.minus({month:1}).toSQLDate();
const month = date.month-1;
const amountInt = parseFloat(accounts[i].amount.substring(1))

accounts[i].oustandingYearAmount = '£'+((12 - month) * amountInt).toFixed(2)
accounts[i].paidYearAmount = '£'+(month * amountInt).toFixed(2)
accounts[i].due = due

console.log(month)
//accounts.push({month});
}

console.log(accounts)
}

//console.log(month)

module.exports = login;


//<div class="_1MwNx"><span class="_2u4DS">Donec bibendum</span></div>
//_1iCxR

          //  "name": "My First Account",
          //  "amount": "£12.34",
          //  "lastPaymentDate": "1970-01-01",
          //  "paidYearAmount": "£123.45",
          //  "outstandingYearAmount": "£123.45"

//{name: 'Donec bibendum', amount_string: '£345.09', due: '18th August'}
