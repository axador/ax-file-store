import csv from "csvtojson";
import fs from "fs";

const setProperty = (obj: any, propPath: string, value: string): any => {
  const [rootPathSection, ...other] = propPath.split(".");
  const pathToValue = other.join(".");

  if (!obj[rootPathSection]) {
    obj[rootPathSection] = {};
  }

  if (pathToValue) {
    return setProperty(obj[rootPathSection], pathToValue, value);
  } else {
    obj[rootPathSection] = value;
    return obj;
  }
};

const runner = async () => {
  const result = await csv({ delimiter: ";" }).fromFile(
    "./translations/translations.csv"
  );

  const languageLibrary: {} = {} as any;

  result.forEach(({ field, ...languages }) => {
    Object.entries(languages).forEach(([language, value]) => {
      setProperty(languageLibrary, `${language}.${field}`, value as string);
    });
  });

  Object.entries(languageLibrary).map(([lg, data]) => {
    fs.rmSync("./translations/" + lg + ".json");
    fs.writeFileSync("./translations/" + lg + ".json", JSON.stringify(data));
  });
};

runner();
