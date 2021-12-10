const cheerio = require("cheerio");
const axios = require("axios");

const result = [];
const url = "https://codingwithstefan.com/table-example"
main = async (webLink) => {
  response = await axios.get(webLink);
  const material = response.data;
  const $ = cheerio.load(material);
  let tableHeaders = [];

  $("body > table > tbody > tr").each((index, element) => {
    if (index === 0) {
      const ths = $(element).find("th");

      ths.each((index, element) => {
        tableHeaders.push($(element).text().toLowerCase());
      });
      return true;
    }
    const tds = $(element).find("td");
    const tableRow = {};
    tds.each((index, element) => {
      tableRow[tableHeaders[index]] = $(element).text();
    });
    result.push(tableRow);
  });
  console.log(result);
};

main(url);
