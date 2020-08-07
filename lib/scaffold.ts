import { readdir, readFile, writeFile } from "fs/promises";
import * as path from "path";

import { readConfig } from "./util/config";
import { parseFrontMatter } from "./util/tmpl8";

export const scaffold = async (args: any) => {
  console.log("im scaffolding");
  const files = await findScaffoldFiles(args.scaffoldName);
  for (let index = 0; index < files.length; index++) {
    const fileName = files[index];
    const fileContents = await readFile(fileName, "utf-8");
    const fm = parseFrontMatter(fileContents);
    console.log(fm);
  }
};

const findScaffoldFiles = async (scaffoldName: string) => {
  const config = readConfig();
  const files = (
    await readdir(
      path.resolve(process.cwd(), config.scaffoldDirectory, scaffoldName)
    )
  ).map((f) =>
    path.relative(
      process.cwd(),
      path.resolve(config.scaffoldDirectory, scaffoldName, f)
    )
  );

  console.log(files);
  return files;
};
