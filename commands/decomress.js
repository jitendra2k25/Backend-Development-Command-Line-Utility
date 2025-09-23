import fs from "fs";
import path from "path";
import JSZip from "jszip";
import chalk from "chalk";

export const deCompressFile = (filePath) => {
  let message = ["verifying path...", "decompressing...", "Downloading..."];
  if (!fs.existsSync(filePath)) {
    console.log("File not Exist on the provided path : ", filePath);
    return;
  }
  console.log(chalk.cyanBright(message[0]));
  fs.readFile(filePath, function (err, data) {
    if (!err) {
      var zip = new JSZip();
      if (getFileExtension(filePath) === "zip") {
        console.log(chalk.blueBright(message[1]));
        zip.loadAsync(data).then(function (contents) {
          Object.keys(contents.files).forEach(function (filename) {
            zip
              .file(filename) // file name
              .async("nodebuffer") // type
              .then(function (content) {
                console.log(chalk.magentaBright(message[2]));
                // File saving path (In current directry)
                const outputPath = path.join(process.cwd(), filename);
                // save the extracted file
                fs.writeFileSync(outputPath, content);
                console.log(chalk.cyan("✔ Decompressed Success."));
              });
          });
        });
      } else {
        console.log(chalk.red("⚠ Only Zip file supported"));
      }
    }
  });
};

function getFileExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return "";
  }
  return filename.substring(lastDotIndex + 1);
}
