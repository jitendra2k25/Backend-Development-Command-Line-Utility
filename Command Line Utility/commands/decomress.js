import fs from "fs";
import path from "path";
import JSZip from "jszip";
import chalk from "chalk";

export const deCompressFile = (filePath) => {
  // Array of process messages
  let message = [
    "verifying path...",
    "decompressing...",
    "Downloading...",
    "✔ Decompressed Success.",
  ];
  // Checking File is Exist on given path or not
  if (!fs.existsSync(filePath)) {
    console.log("File not Exist on the provided path : ", filePath);
    return;
  }
  // Message : Verifiying...
  console.log(chalk.cyanBright(message[0]));

  fs.readFile(filePath, function (err, data) {
    if (!err) {
      var zip = new JSZip();

      // Check if the file is a .zip
      if (getFileExtension(filePath) === "zip") {
        // Message: decompressing...
        console.log(chalk.blueBright(message[1]));

        // Load the zip content
        zip.loadAsync(data).then(function (contents) {
          // Loop through each file inside the zip
          Object.keys(contents.files).forEach(function (filename) {
            zip
              .file(filename) // Get each file
              .async("nodebuffer") // Read it as a Node.js buffer
              .then(function (content) {
                // Message: Downloading...
                console.log(chalk.magentaBright(message[2]));

                // Define where to save the extracted file
                const outputPath = path.join(process.cwd(), filename);

                // Write the file to disk
                fs.writeFileSync(outputPath, content);

                console.log(chalk.cyan(message[3]));
              });
          });
        });
      } else {
        // ⚠ If it's not a zip file, show error
        console.log(chalk.red("⚠ Only Zip file supported"));
      }
    }
  });
};

// Getting Receving File Extension
function getFileExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return "";
  }
  return filename.substring(lastDotIndex + 1);
}
