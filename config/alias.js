const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());

// Update mappings in tsconfig.json as well.
module.exports = {
    "@watcourses": path.resolve(path.resolve(appDirectory, "src"), "./App"),
};
