const HTMLParser = require('node-html-parser')
const fetch = require('node-fetch')
const fs = require('fs')


const scrapePersons = async () => {
  // import launchChrome and newPage from the browser.js file in the same directory
  const { launchChrome } = require("./browser");

  // Flow 1 => Launching chrome and opening a new tab/page
  const [newPage, exitChrome] = await launchChrome();
  const [page] = await newPage();

  // exit the function if the tab is not properly opened
  if (!page) return;

  // Flow 2 => Visiting a wonderbill's dashboard
  const url = "https://my.wonderbill.com/dashboard";
  console.log("Opening " + url);
  try {
    await page.goto(url, {
      waitUntil: "networkidle0", // wait till all network requests has been processed
    });

await page.click('#_evidon-accept-button');

    await page.type('input[type=email]', 'candidate+7@wonderbill.com');
    await page.type('input[type=password]', 'M/Cw?7w!G/6-');
    await page.click('button[type=submit]');

    await page.waitForNavigation();
  } catch(e) {
    console.error("Unable to visit " + url, e);
    await exitChrome(); // close chrome on error
    return; // exiting the function
  }

//const clickBtn = async (nth = 0) => {
 // try {
  //  await page.evaluate(() => {
   //   const btnSelector = ".btn";
    //  const btn = document.querySelectorAll(btnSelector)[nth];
     // btn.focus();
    // btn.click();
  // });
 // } catch(e) {
 //   console.error("Unable to click button", e);
 // }
//};

//const text = HTMLParser.parse('${url}')

//var name = url.getElementById('_2u4DS'),

//htmlContent = name.innerHTML,
// htmlContent = "Some <span class="foo">sample</span> text."

//textContent = name.textContent;
// textContent = "Some sample text."

//console.log(htmlContent)
//console.log(textContent)

//console.log(url.span._2u4DS)

//<span class="_2u4DS">Donec bibendum</span>

//console.log(text)


const NameDiv = '${url}'._1MwNx

//const extractPersons = async () => {
  //try {
   // const persons = await page.evaluate(() => {
     // let persons = [];
     // const personsElem = document.querySelectorAll($NameDiv);
     // const personsElemLen = personsElem.length;

      //for (let i = 0; i < personsElemLen; i++) {
        //try {
         // const personElem = personsElem[i];

         // const photo = personElem.querySelector("{$NameDev}._2u4DS").src;
console.log(NameDiv)
          //const name = personElem.querySelector("h3").innerText;
         // const email = personElem.querySelector(".email").innerText;
        //const phone = personElem.querySelector(".phone").innerText;
          
 //         persons.push({ photo });
   //     } catch (e) {}
     // }

      //return persons;
   // });

 

    // do anything with persons

   // console.log(persons.length, "persons", persons);
 // } catch(e) {
   // console.error("Unable to extract persons data", e);
 // }
//};
//extractPersons();

//clickBtn(0); // clicks the 1st occurence of the ".btn" selector

 

// await exitChrome(); // close chrome
};

module.exports = scrapePersons;



