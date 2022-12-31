#!/usr/bin/env node// This file runs with node > 7.6
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
// which has support for async/await

import { readFileSync, writeFileSync } from "fs";

import glob from "glob-promise";
import path from "path";
import { safeLoad } from "js-yaml";
import sizeOf from "image-size";

const outfile = process.argv[2];

const read = (d) => readFileSync(d, "utf8");

const imageSize = (im) =>
  new Promise((res) =>
    sizeOf(im, function (e, sz) {
      delete sz.type;
      return res(sz);
    })
  );

(async function () {
  const asset_names = {};
  const names = read("names.txt")
    .split("\n")
    .map(function (line) {
      let [id, string] = line.split("  ");
      id = parseInt(id);
      return (asset_names[id] = string);
    });

  let assets = await glob("../assets/png/*.png");
  assets = assets.map(async function (fn) {
    const size = await imageSize(fn);
    const name = path.basename(fn, ".png");
    let [id, colorway] = name.split("-");
    id = parseInt(id);
    const note = asset_names[id];

    return { id, colorway, name, note, size };
  });

  assets = await Promise.all(assets);

  const __colorOrder = "K C M R B DO".split(" ");
  const colorOrder = (d) => __colorOrder.indexOf(d.colorway);

  assets.sort(function (a, b) {
    if (a.id === b.id) {
      return colorOrder(a) - colorOrder(b);
    }
    return a.id - b.id;
  });

  const structure = safeLoad(read("data.yaml"));

  const data = { structure, assets };

  for (var asset of Array.from(assets)) {
    console.log(asset);
  }

  const _ = JSON.stringify(data);
  return writeFileSync(outfile, _, "utf8");
})();
