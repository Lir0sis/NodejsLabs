const os = require('os');
const delimiter = os.platform() === 'win32' ? '\\' : '/';
console.log(__dirname + `${delimiter}text.txt`);
const file1 = require(__dirname + "/../" + "public" + delimiter2 + "file.js");
const file2 = require(path.join(__dirname, "../", "public", "file.js"));
