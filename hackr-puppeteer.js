const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Lists = require('./models/hackr-lists')
const {atlas: mongoKey} = require('./keys/keys')
const url = 'https://hackr.io/tutorials/learn-python'
async function dbConnection(){
    await mongoose.connect(`mongodb+srv://jack:${mongoKey}@learning-node.ev0yn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
}
async function main(){
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto(url)
    const html = await page.content()
    const $ = cheerio.load(html)
    const singlePageLists= $(".tut-list-primary").map((i,e) => { 
        const title = $(e).find('.tutorial-title-txt').text()
        const url = $(e).find('.js-tutorial-title').attr("href")
        const upVote = $(e).find(".count").text()
        return { title, url, upVote }
    }).get()
    console.log(singlePageLists)
}

// async function loopPages(page){
//     const html = await page.content()
//     const $ = cheerio.load(html)
//     for(let i = 0; i <5; i++){ 
       
//     }
// }

main()