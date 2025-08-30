import { readFileSync, writeFileSync } from "fs";

export const consoleLog = (...messages: string[]) => {
  console.log("\x1b[90m[wikilinks]\x1b[0m", ...messages);
};

export const consoleWarn = (...messages: string[]) => {
  console.warn("\x1b[90m[wikilinks]\x1b[33m [WARN]\x1b[0m", ...messages);
};
export const writeToAssets = (json: object) =>
  writeFileSync("./_site/linkMap.json", JSON.stringify(json));
export const loadFromAssets = (filename: string) => {
  return readFileSync("./_site/" + filename, "utf-8");
};
