const axios = require("axios");
const cheerio = require("cheerio");

async function fetchData(url) {
  console.log("🤟 Scraping data...");
  // make http call to url
  let response = await axios(url).catch((err) => console.log(err));

  if (response.status !== 200) {
    console.log("❌ Error occurred while fetching data");
    return;
  }

  return response;
}

export async function getHtmlFromOracle(url) {
  let res = await fetchData(url);

  if (!res.data) {
    console.log("❌ Invalid data Obj");
    console.log("");
    return;
  }
  const html = res.data;
  // mount html page to the root element
  const $ = cheerio.load(html);

  const dataObj = {};
  const nodes = $(
    "#oafcontent #p_SwanPageLayout .x7m .x7m table table tbody > tr"
  );

  let counter = 1;

  nodes.each(function () {
    const tds = $(this).find("td");
    const content = tds.text();

    if (content) {
      dataObj["line-" + counter] = content;
      counter++;
    }
  });

  if (Object.keys(dataObj).length === 0) return "";

  return JSON.stringify(dataObj);
}
