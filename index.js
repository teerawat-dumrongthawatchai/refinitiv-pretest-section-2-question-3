const axios = require('axios')
const cheerio = require('cheerio')

axios
    .get('https://codequiz.azurewebsites.net/', { headers: { 'Cookie': 'hasCookie=true' }})
    .then((res) => {
        $ = cheerio.load(res.data)

        let fundValue = `not found.`;
        for(let i = 0; i < $('table tr').length; i++) {
            let rowData = $(`table tr`).eq(i);
            if(rowData.find(`td:nth-of-type(1)`).text().trim() == `${process.argv[2]}`) {
                fundValue = rowData.find(`td:nth-of-type(2)`).text()
                break;
            }
        }

        /*
        let result = $(`table tr`).map((i, item) => {
            if (i !== 0) {
                return {
                    code: $(item).find('td:nth-of-type(1)').text(),
                    nav: $(item).find('td:nth-of-type(2)').text()
                }
            }
        }).get()
        */

        console.log(fundValue)
    })
    .catch(e => {
        console.log(e)
    })