const Compress = require("./commands/compress");
const Decompress = require("./commands/decomress");
const Str = require("./commands/string");
const API = require("./commands/api");

const arg = process.argv.splice(2);

switch (arg[0]) {
  case "compress":
    Compress.compressFile(arg[1]);
    break;
  case "decompress":
    Decompress.deCompressFile(arg[1]);
    break;
  case "string":
    Str.strOperations(arg);
    break;
  case "api":
    API.fetchData();
    break;
  default:
    console.log("unknown Operation.");
    break;
}
