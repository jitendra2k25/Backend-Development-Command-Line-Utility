const scrapeSite = require("./scrapers/site-scraper");

// site configuration
const config = {
  url: "https://www.westside.com/collections/kurtas-for-women",
  rootSelector: ".wizzy-result-product-item", // each product container or root element
  fields: [
    {
      name: "title",
      selector: ".product-item-title", // title className
      type: "text",
    },
    {
      name: "price",
      selector: ".wizzy-product-item-price", // price className
      type: "text",
    },
    {
      name: "image",
      selector: ".result-product-item-image img", // image wrapper className with img tag
      attr: "src", // img tag src attribute
    },
  ],
};

scrapeSite(config);
