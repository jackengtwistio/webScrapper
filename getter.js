const axios = require('axios')
const fs = require('fs')

async function getHtml(url){
    const response = await axios.get(url)
    return response.data
}

function saveHtml(html){
    fs.writeFileSync('./test.html', html)
}

async function main() {
    const html = await getHtml('https://hackr.io/tutorials/learn-python')
    saveHtml(html)
}

main()