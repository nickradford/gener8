import * as path from "path";

interface Gener8Config {
  outputDirectory: string;
  templateDirectory: string;
  scaffoldDirectory: string;
  [key: string]: any;
}

const configDefaults: Gener8Config = {
  outputDirectory: "src/$0",
  templateDirectory: ".gener8",
  scaffoldDirectory: ".gener8/scaffolds",
};

export const readConfig: () => Gener8Config = () => {
  const config = require(path.resolve(process.cwd(), "gener8.config.js"));
  return { ...configDefaults, ...config };
};
