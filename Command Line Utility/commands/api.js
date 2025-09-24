import cliSelect from "cli-select";
import "dotenv/config";
import chalk from "chalk";

// reuseable Function for fetching the data from the API and return a json format
const fetchAndLogData = async (url, formatter) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    formatter(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Printing format of quotes
const printQuotes = (quotes) => {
  for (const quote of quotes) {
    console.log(chalk.blue(`Quote  : ${quote.content}`));
    console.log(chalk.gray(`Author : ${quote.author}`));
  }
};

// Printing format of Jokes
const printJokes = (jokes) => {
  for (const joke of jokes) {
    console.log(chalk.blue(`A : ${joke.setup}`));
    console.log(chalk.cyan(`B : ${joke.punchline}`));
  }
};

// Printing format of News
const printNews = (newsResponse) => {
  // check if articles is emepty!
  if (!newsResponse.articles) {
    console.error("Invalid news data.");
    return;
  }

  // Logging only three articles from the array
  for (const article of newsResponse.articles.slice(0, 3)) {
    console.log(chalk.blue(`Title       : ${article.title}`));
    console.log(chalk.redBright(`Description : ${article.description}`));
    console.log(chalk.gray(`Author      : ${article.author} \n\n`));
  }
};

export const fetchData = async () => {
  try {
    // CliSelect use for the diplaying the multiple option then choose any one
    const result = await cliSelect({
      values: ["Daily Inspiration", "Daily Jokes", "Today Top News"], // array of options
      defaultValue: 0, // default value if not any selected
    });

    console.log("-----------------------------------------------------");
    switch (result.id) {
      case 0:
        await fetchAndLogData(process.env.QUOTE_API, printQuotes);
        break;

      case 1:
        await fetchAndLogData(process.env.JOKES_API, printJokes);
        break;

      case 2:
        await fetchAndLogData(process.env.NEWS_API, printNews);
        break;

      default:
        console.log("Invalid selection.");
        break;
    }
    console.log("-----------------------------------------------------");
  } catch (err) {
    console.log("Selection cancelled.");
  }
};
