const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const url = 'https://newyork.craigslist.org/search/sof?'
async function main(){
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto(url)
    const html = await page.content()
    
    const $ = cheerio.load(html)
    // $(".result-title").each((i,e)=>console.log(`${$(e).text()} link: ${$(e).attr("href")}\n`))

    const results= $(".result-title").map((i,e) => { 
        const title = $(e).text()
        const url = $(e).attr("href")
        return { title, url }
    }).get()
    console.log(results)
}

main()