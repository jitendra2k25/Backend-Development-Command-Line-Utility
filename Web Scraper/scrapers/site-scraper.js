const puppeteer = require("puppeteer"); // for launch the browser and open the url
const cheerio = require("cheerio"); // for looking HTML content
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter; // write into excel file like csv

const scrapeSite = async (config) => {
  // deconstructing config key values
  const { url, rootSelector, fields } = config;
  const data = [];
  let count = 1;

  try {
    console.log("Launching browser...");
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log("Navigating to:", url);
    // Navigate the page to a URL.
    await page.goto(url, { waitUntil: "networkidle2" });

    // Load Enitre website content
    const html = await page.content();
    //  Pass that content to cheerio for looking each line
    const $ = cheerio.load(html);

    // Select the Root element
    const items = $(rootSelector);

    // Checking root element is exist or not
    if (!items.length) {
      console.warn("No elements found using selector:", rootSelector);
      // close the puppetter launch browser
      await browser.close();
      return;
    }

    // fetch all root element inside data of each item
    items.each(function () {
      // creating record for each item with assigning a custom I'd by extracting item counts
      const record = { id: count++ };

      // Extract the field from predefined json file
      for (const field of fields) {
        const el = $(this).find(field.selector); // element

        if (field.attr) {
          // extracting url from src attribute
          record[field.name] = el.attr(field.attr) || "";
        } else if (field.type === "text") {
          // extracting text
          record[field.name] = el.text().trim();
        }
      }

      // store the entire record into a array
      data.push(record);
    });

    // after fetching all closing the peppeteer launch browser
    await browser.close();

    // check array length if not zero
    if (data.length > 0) {
      const dir = "./data";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync("./data");
      }
      // Write to JSON
      fs.writeFileSync("./data/results.json", JSON.stringify(data, null, 2));
      console.log("✔ Data saved to results.json");

      // Write to CSV
      const headers = [
        { id: "id", title: "ID" },
        ...fields.map((f) => ({ id: f.name, title: f.name })),
      ];

      const csvWriter = createCsvWriter({
        path: "./data/results.csv",
        header: headers,
      });

      await csvWriter.writeRecords(data);
      console.log(`✔ Scraped and saved ${data.length} items`);
    } else {
      console.log("⚠ No data extracted from DOM.");
    }
  } catch (error) {
    console.error("⚠ Scraping error:", error.message);
  }
};

module.exports = scrapeSite;
