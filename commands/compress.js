import fs from "fs";
import path from "path";
import JSZip from "jszip";
import chalk from "chalk";

export const compressFile = async (filePath) => {
  let message = ["verifying path...", "compressing...", "Downloading..."];
  if (!fs.existsSync(filePath)) {
    console.error(`The file ${filePath} does not exist.`);
    return;
  }
  console.log(chalk.cyanBright(message[0]));
  const zip = new JSZip();
  const fileName = path.basename(filePath);
  const fileData = fs.readFileSync(filePath);

  zip.file(fileName, fileData);

  console.log(chalk.blueBright(message[1]));

  // Generate ZIP as Node.js Buffer (not Blob)
  const zipBuffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: {
      level: 9,
    },
  });

  console.log(chalk.magentaBright(message[2]));
  const outputPath = path.join(process.cwd(), "archive.zip");
  fs.writeFileSync(outputPath, zipBuffer);

  console.log(chalk.cyan("✔ Compressed Success."));
};
