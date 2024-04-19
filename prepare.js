//from https://stackoverflow.com/questions/40682848/how-to-clean-delete-contents-folder-with-npm
var fs = require("fs");

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${path}"...`);
    fs.rmdirSync(path);
  }
}

console.log("Cleaning working tree...");

deleteFolderRecursive("./dist");
// make directory (dist)
fs.mkdirSync("./dist");

console.log("Successfully cleaned working(./dist) tree!");

// get package.json version field.
var packageJson = require("./package.json");
var version = packageJson.version;

//replace patch version in package.json
var newVersion = version.split(".");
newVersion[2] = parseInt(newVersion[2]) + 1;
newVersion = newVersion.join(".");
packageJson.version = newVersion;

//write new package.json
fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

//copy package.json to ./dist/package.json
fs.copyFileSync("./package.json", "./dist/package.json");

//copy REMDMe.md to ./dist/README.md
fs.copyFileSync("./README.md", "./dist/README.md");

//write console
console.log(
  `Updated package.json version to %c${newVersion}`,
  "color: blue; font-weight: bold;"
);

// // build 폴더 내의 파일들을 확인하고, main 속성을 업데이트합니다.
// const buildFolder = "./dist/static/js";
// const files = fs.readdirSync(buildFolder);
// const mainFile = files.find(
//   (file) => file.startsWith("main.") && file.endsWith(".js")
// );

// if (mainFile) {
//   const packageJsonPath = "./dist/package.json";
//   const packageJson = require(packageJsonPath);
//   packageJson["main"] = `static/js/${mainFile}`;
//   fs.writeFileSync("./dist/package.json", JSON.stringify(packageJson, null, 2));
//   console.log(`Updated package.json with main file: ${packageJson.main}`);
// } else {
//   console.error("Main file not found in the build folder.");
// }

//remove dist path in dist/package.json at main
var distPackageJson = require("./dist/package.json");
distPackageJson.main = "index.js";
distPackageJson.types = "index.d.ts";
fs.writeFileSync(
  "./dist/package.json",
  JSON.stringify(distPackageJson, null, 2)
);

//write console with changed values in dist/package.json
console.log(`Updated dist/package.json main to ${distPackageJson.main}`);
console.log(`Updated dist/package.json types to ${distPackageJson.types}`);

// //update Signature.tsx
// var signatureLogger = fs.readFileSync("./src/lib/Signature.tsx", "utf8");

// //replace version in Signature.tsx
// signatureLogger = signatureLogger.replace(
//   /const currentVersionFromPackageJson = '[^']*'/,
//   `const currentVersionFromPackageJson = '${newVersion}'`
// );

// //write Signature.tsx
// fs.writeFileSync("./src/lib/Signature.tsx", signatureLogger);

// //write console
// console.log(`Updated Signature.tsx version to ${newVersion}`);
