const fs = require("fs");
const translationsFile = "public/languages.json";
const languages = JSON.parse(fs.readFileSync(translationsFile, "utf8"));

if (process.argv.length < 3) {
  console.log("Usage: yarn run translate <language>");
  process.exit(1);
}

const translateLanguage = languages.find(lang => lang["iso3"] === process.argv[2]);
if (translateLanguage == null) {
  console.log("Language not found");
  process.exit(1);
}

const fallbackLanguage = languages.find(lang => lang.fallback);
const missingKeys = Object.keys(fallbackLanguage.keys)
  .filter(key => translateLanguage.keys[key] == null);

if (missingKeys.length === 0) {
  console.log("This language is already fully translated! :)")
  process.exit(0)
}

missingKeys.forEach(key => console.log('"'+key+'": ""'))