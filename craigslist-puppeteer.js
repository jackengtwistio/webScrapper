const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
async function pause(msecs){
    return new Promise(resolve => setTimeout(resolve, msecs))
}

async function listsScrapper(page){
    await page.goto('https://newyork.craigslist.org/search/sof?')
    const html = await page.content()
    const $ = cheerio.load(html)
    // $(".result-title").each((i,e)=>console.log(`${$(e).text()} link: ${$(e).attr("href")}\n`))

    const lists = $(".result-info").map((i,e) => { 
        const title = $(e).find(".result-title").text()
        const url = $(e).find(".result-title").attr("href")
        const date = new Date($(e).find(".result-date").attr("datetime"))
        const neighbourhood = $(e).find(".result-hood").text().trim()
        return { title, url, date, neighbourhood }
    }).get()
    return lists
}

async function descriptionScrapper(lists, page){
    for(let i = 0; i < lists.length; i++){ 
        await page.goto(lists[i].url)
        const html = await page.content()
        const $ = cheerio.load(html)
        const description = $('#postingbody').text()
        //Stefan used 'nth-child(1)' in the selector
        const compensation = $('p.attrgroup > span:first').text()
        pause(3000)
        lists[i].description = description
        lists[i].compensation = compensation
        console.log(compensation)
    }
}

async function main() {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    const lists = await listsScrapper(page)
    const results = await descriptionScrapper(lists,page)
    console.log(results)
}

main()