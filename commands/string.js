import chalk from "chalk";
export const strOperations = (arg) => {
  const stringArg = arg.splice(1);
  const text = stringArg[1];
  if (!stringArg[0]) {
    console.log("String Operation Required");
    return;
  }
  switch (stringArg[0].toLowerCase()) {
    case "uppercase":
      console.log(chalk.cyanBright(text.toUpperCase()));
      break;
    case "lowercase":
      console.log(chalk.cyanBright(text.toLowerCase()));
      break;
    case "words":
      const words = text.trim().split(/\s+/);
      console.log(chalk.cyanBright(words.length));
      break;
    case "ispalindrome":
      const reverse = text.split("").reverse().join("");
      if (text === reverse) {
        console.log(chalk.cyanBright("✔ Given String is palindrome."));
      } else {
        console.log(chalk.red("❌ Not a palindrome String."));
      }
      break;
    default:
      console.log("⚠ unknown string operation.");
      break;
  }
};
