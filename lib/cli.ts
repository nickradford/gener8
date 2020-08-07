import {
  findTmpl8ByFilename,
  compileTmpl8,
  parseFrontMatter,
  writeOutputToFile,
} from "./util/tmpl8";
import * as yargs from "yargs";
import { readConfig } from "./util/config";
import { scaffold } from "./scaffold";

yargs
  .command(
    "$0 <type> <name>",
    "generate a file based on a template",
    (y) => {
      y.positional("type", {
        describe: "type of .tmpl8 file to use",
        type: "string",
      });
      y.positional("name", {
        describe: "name of the output file",
        type: "string",
      });
    },
    defaultCli
  )
  .command(
    "scaffold <scaffoldName> <fileName>",
    "scaffold multiple files at the same time",
    (y) => {
      y.positional("scaffoldName", {
        describe: "the name of the scaffold",
        type: "string",
      });
      y.positional("fileName", {
        describe: "name for the output files",
        type: "string",
      });
    },
    scaffold
  )
  .help().argv;

async function defaultCli(argv: any) {
  console.log(argv);
  const config = readConfig();
  const tmpl8 = await findTmpl8ByFilename(argv.type as string);
  const fm = parseFrontMatter(tmpl8);
  const options = {
    ...fm.attributes,
    ...argv,
  };
  const output = compileTmpl8(fm.body, options);
  const outDir = config.outputDirectory.replace("$0", argv.type + "s");
  const filename = `${outDir}/${argv.name}.${options.extension}`;

  await writeOutputToFile(output, filename);

  console.log(`Wrote "${filename}" to disk`);
}

// cli();
