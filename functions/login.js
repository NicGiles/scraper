
const login = async () => {

 const { launchChrome } = require("./browser");

   const [newPage, exitChrome] = await launchChrome();
  const [page] = await newPage();

  if (!page) return;

  // Flow 2 => Visiting a wonderbill's dashboard
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

    const accounts = page.evaluate(() => {
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
console.log(accounts)
	return accounts; });


;}

module.exports = login;
