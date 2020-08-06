const { readFile, writeFile } = require("fs");
const { promisify } = require("util");
const path = require("path");
const Handlebars = require("handlebars");

const frontMatter = require("front-matter");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

export const findTmpl8ByFilename = async (name: string) => {
  // console.log(process.cwd());
  const filePath = path.resolve(process.cwd(), ".gener8", `${name}.tmpl8`);
  const fileContents = await readFileAsync(filePath, "utf8");
  // console.log(fileContents);
  return fileContents;
};

export const parseFrontMatter = (fileContents: string) => {
  const fm = frontMatter(fileContents);
  // console.log(fm);
  return fm;
};

export const compileTmpl8 = (body: string, options: any) => {
  const tmpl8 = Handlebars.compile(body);
  const output = tmpl8(options);
  return output;
};

export const writeOutputToFile = async (output: string, filename: string) => {
  return await writeFileAsync(filename, output, "utf8");
};
