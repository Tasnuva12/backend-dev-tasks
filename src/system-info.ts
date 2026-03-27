const os = require("os");

console.log("Platform: ", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU Info:", os.cpus());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());
console.log("Home Directory:", os.homedir());
console.log("Current Working Directory:", process.cwd());
