import fs from "fs";
import path from "path";
import JSZip from "jszip";
import chalk from "chalk";

export const compressFile = async (filePath) => {
  // Array of process messages
  let message = [
    "verifying path...",
    "compressing...",
    "Downloading...",
    "✔ Compressed Success.",
  ];
  // Checking File is Exist on given path or not
  if (!fs.existsSync(filePath)) {
    console.error(`The file ${filePath} does not exist.`);
    return;
  }
  // Message : Verifiying...
  console.log(chalk.cyanBright(message[0]));

  // JSZip is a JS Library which help to compress or decompress the files
  const zip = new JSZip();
  const fileName = path.basename(filePath);
  // read the file
  const fileData = fs.readFileSync(filePath);

  // Create a New Archive File with there data
  zip.file(fileName, fileData);

  // Message : compressing...
  console.log(chalk.blueBright(message[1]));

  // Generate ZIP as Node.js Buffer (not Blob)
  const zipBuffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: {
      level: 9,
    },
  });

  // Downloading...
  console.log(chalk.magentaBright(message[2]));
  // Define where to save the file
  const outputPath = path.join(process.cwd(), "archive.zip");
  // Write the file to disk
  fs.writeFileSync(outputPath, zipBuffer);

  // ✔ Compressed Success.
  console.log(chalk.cyan(message[3]));
};
