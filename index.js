const cheerio = require('cheerio');
const axios = require('axios');

async function main(){
    const result = await axios.get(
        "https://codingwithstefan.com/table-example"
    );
    const $ = cheerio.load(result.data);
    let first = []
    let second = []
    let third = []
    function appendResult(result,index,element,selector){
        result.push($($(element).find(selector)[index]).text())
        result.push('---------')
    }
    $("body > table > tbody > tr").each((index,element)=>{
        
        appendResult(first,0,element,"td")
        appendResult(second,1,element,"td")
        appendResult(third,2,element,"td")
        // const ii = cheerio.load(element)
        // ii('>td').each((index,element)=>{
        //     console.log(ii(element).text())
        // })

    })
    console.log(first)
    console.log(second)
    console.log(third)
}

main()