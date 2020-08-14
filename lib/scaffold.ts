import { readdir, readFile, writeFile } from "fs/promises";
import * as path from "path";

import { readConfig } from "./util/config";
import {
  parseFrontMatter,
  compileTmpl8,
  writeOutputToFile,
} from "./util/tmpl8";

export const scaffold = async (args: any) => {
  console.log("im scaffolding");
  console.log(args);
  const config = readConfig();
  const files = await findScaffoldFiles(args.scaffold);
  for (let index = 0; index < files.length; index++) {
    const fileName = files[index];
    const fileContents = await readFile(fileName, "utf-8");
    const fm = parseFrontMatter(fileContents);
    console.log(fm);
    const fileOutput = compileTmpl8(fm.body, args);
    const outDir = config.outputDirectory.replace("$0", "");
    const outFile = `${outDir}/${fm.attributes.isIndex ? "index" : args.name}.${
      fm.attributes.extension
    }`;

    writeOutputToFile(fileOutput, outFile);
  }
};

const findScaffoldFiles = async (scaffold: string) => {
  const config = readConfig();
  const files = (
    await readdir(
      path.resolve(process.cwd(), config.scaffoldDirectory, scaffold)
    )
  ).map((f) =>
    path.relative(
      process.cwd(),
      path.resolve(config.scaffoldDirectory, scaffold, f)
    )
  );

  console.log(files);
  return files;
};
