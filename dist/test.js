"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("./fs/paths");
const pathsToTest = [
    `/`,
    `\\`,
    `C:\\`,
    `C:\\Users\\user\\AppData\\Roaming`,
    `~`,
    `~/`,
    `~/Library/Application Support`,
    `~/Library/Application Support/`,
    `~/Library/Application Support/Code/User`,
    `~\\Library\\Application Support\\Code\\User`,
    `~\\Library\\Application Support\\Code\\User\\`,
    `d`,
    `.`,
    `not a path`,
    `also_not_a_path`,
];
for (const path of pathsToTest) {
    console.log(`${path} \t ${(0, paths_1.resolve)(path)} `);
}
//# sourceMappingURL=test.js.map