import csv from "csvtojson";
import fs from "fs";

const runner = async () => {
  const oldV = await csv().fromFile("./translations/translations.csv");
  const newV = await csv({ delimiter: ";" }).fromFile(
    "./translations/translations-v1.csv",
    {}
  );

  oldV.forEach(({ field }, index) => {
    const { field: newField } = newV[index];

    if (field !== newField) {
      console.log(field, "------", newField);
    }
  });
};

runner();
