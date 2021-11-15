
# Wonderbill Scraper

A puppeteer driven scraper designed to retrieve account details from Wonderbill.com.

### installation

`npm i`

### usage

`node .index.js'

This wil run the programme and save the scraped data to /data/accounts.json.

### spec 

* Is runnable through the command line
* Can log in to the WonderBill website using credentials provided via CLI
arguments
* Written in JavaScript
* Gathers the following information on each account belonging to the
user:
    * Name
    * Amount
    * Payment date
* For each account, the amount spent so far this year, and the amount left to
pay this year should be calculated (assume all accounts are paid monthly)
* After gathering all account data, it should be output as valid JSON and
follow the pattern shown in the example below:
```
{
    "accounts": [
        {
            "name": "My First Account",
            "amount": "Â£12.34",
            "lastPaymentDate": "1970-01-01",
            "paidYearAmount": "Â£123.45",
            "outstandingYearAmount": "Â£123.45"
        },
        {
            "name": "My Second Account",
            "amount": "Â£12.34",
            "lastPaymentDate": "1970-01-01",
            "paidYearAmount": "Â£123.45",
            "outstandingYearAmount": "Â£123.45"
        }
    ]
}
```
