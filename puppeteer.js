const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const url = 'https://hackr.io/tutorials/learn-python'
async function main(){
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(url)
    const html = await page.content()
    
    const $ = cheerio.load(html)
    $(".tutorial-title-txt").each((i,e)=>console.log(`${$(e).text()}\n`))
}

main()