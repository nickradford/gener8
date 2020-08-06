import {
  findTmpl8ByFilename,
  compileTmpl8,
  parseFrontMatter,
  writeOutputToFile,
} from "./util/tmpl8";
import * as yargs from "yargs";

const argv = yargs
  .command("$0 <type> <name>", "generate a file based on a template", (y) => {
    y.positional("type", {
      describe: "type of .tmpl8 file to use",
      type: "string",
    });
    y.positional("name", {
      describe: "name of the output file",
      type: "string",
    });
  })
  .help().argv;

console.log(argv);

async function cli() {
  const tmpl8 = await findTmpl8ByFilename(argv.type as string);
  const fm = parseFrontMatter(tmpl8);
  const output = compileTmpl8(fm.body, fm.attributes, { ...argv });
  const filename = `${argv.name}.${fm.attributes.extension}`;
  await writeOutputToFile(output, filename);
  console.log(`Wrote "${filename}" to disk`);
}

cli();
