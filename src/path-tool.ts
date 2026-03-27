const path = require("path");
const [, ,command, ...args] = process.argv;

if (!command) {
  console.error("Please provide a command to continue.");
  process.exit(1);
}

switch(command){
    case "join":
        console.log("Joined Path:", path.join(...args));
        break;
    
    case "basename":    
        console.log("Base Name:", path.basename(args[0]));
        break;   
    case "extname":
        console.log("Extension Name:", path.extname(args[0]));  
        break;         
}