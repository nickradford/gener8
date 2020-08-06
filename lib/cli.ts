import { findTmpl8ByFilename } from "./util/tmpl8";

const argv = require("yargs")
  .command(
    "$0 <type> <name>",
    "generate a file based on a template",
    (yargs) => {
      yargs.positional("type", {
        describe: "type of .tmpl8 file to use",
        type: "string",
      });
      yargs.positional("name", {
        describe: "name of the output file",
        type: "string",
      });
    }
  )
  .help().argv;

console.log(argv);

const tmpl8 = findTmpl8ByFilename(argv.type);
