const fs =require("fs");
const filePath = require("path");

const fileName = process.argv[2];

if (!fileName) {
  console.error("Please provide a file name as an argument.");
  process.exit(1);
}
if (!fs.existsSync(fileName)) {
  console.error("File does not exist:", fileName);
  process.exit(1);
}
const stats = fs.statSync(fileName);

console.log("File Name:", filePath.basename(fileName)); 
console.log("File Size (bytes):", stats.size);  
console.log("Created At:", stats.birthtime);    
console.log("Last Modified At:", stats.mtime);  
console.log("Is Directory:", stats.isDirectory());  
console.log("Is File:", stats.isFile());    
const parsed = filePath.parse(fileName);
console.log(parsed);