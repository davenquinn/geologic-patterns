var spritezero = require("@mapbox/spritezero");
var fs = require("fs");
var glob = require("glob");
var path = require("path");

let dir = path.join(__dirname, "..");

let sizes = [1, 2, 4];

let patterns = {
  "series-100": "1*-K",
  "series-200": "2*-K",
  "series-300": "3*-K",
  "series-400": "4*-K",
  "series-500": "5*-K",
  "series-600": "6*",
  "series-700": "7*",
};

async function generateLayout(
  path: string,
  opts: {
    imgs: string[];
    pixelRatio: number;
  }
): Promise<void> {
  // Pass `true` in the layout parameter to generate a data layout
  // suitable for exporting to a JSON sprite manifest file.
  return new Promise((resolve, reject) => {
    spritezero.generateLayout(
      { format: true, ...opts },
      function (err, dataLayout) {
        if (err) return reject(err);
        fs.writeFileSync(path, JSON.stringify(dataLayout));
        resolve();
      }
    );
  });
}

async function generateImage(
  path: string,
  opts: {
    imgs: string[];
    pixelRatio: number;
  }
): Promise<void> {
  // Pass `false` in the layout parameter to generate an image layout
  // suitable for exporting to a PNG sprite image file.
  return new Promise((resolve, reject) => {
    spritezero.generateLayout(
      { format: false, ...opts },
      function (err, imageLayout) {
        spritezero.generateImage(imageLayout, function (err, image) {
          if (err) return reject(err);
          fs.writeFileSync(path, image);
          resolve();
        });
      }
    );
  });
}

async function main() {
  for await (const pxRatio of sizes) {
    for await (const [series, pattern] of Object.entries(patterns)) {
      console.log(pxRatio, series, pattern);
      var svgs = glob
        .sync(path.resolve(path.join(dir, `assets/svg/${pattern}.svg`)))
        .map(function (f) {
          return {
            svg: fs.readFileSync(f),
            id: path.basename(f).replace(".svg", ""),
          };
        });
      const basename = path.resolve(
        path.join(dir, `output/${series}@${pxRatio}`)
      );
      var pngPath = basename + ".png";
      var jsonPath = basename + ".json";

      await generateLayout(jsonPath, { imgs: svgs, pixelRatio: pxRatio });
      await generateImage(pngPath, { imgs: svgs, pixelRatio: pxRatio });
    }
  }
}

main();
