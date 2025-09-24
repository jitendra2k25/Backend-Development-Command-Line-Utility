const Compress = require("./commands/compress");
const Decompress = require("./commands/decomress");
const Str = require("./commands/string");
const API = require("./commands/api");

// Extracting the Third Argument frmo Terminal
const arg = process.argv.splice(2); // It can return all the arguments after 2 position like [3,4,5...]

// Validating First Operation where arg[0] means it return third argument from command
switch (arg[0]) {
  // operations
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

  // when Operation not matched
  default:
    console.log("unknown Operation.");
    break;
}
