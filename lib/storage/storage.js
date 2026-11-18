import fs from "fs"
import { validateMacros } from "../helpers.js"
import * as logger from '../log/logger.js'

export function saveMacros(macros, path) {
    fs.writeFileSync(path, JSON.stringify(macros, null, 2));
    
}
export function loadMacros(path) {
    try {
        if (!fs.existsSync(path)) {

            return [];
        }
        let raw = fs.readFileSync(path, "utf8");
        let data = JSON.parse(raw);
        validateMacros(data);
        return data || [];
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`${colors.red}macros.json not found at path: ${path}${colors.reset}\n`);
            console.error(`You should:`);
            console.error(`   1. Create ${colors.bgGray}macros.json${colors.reset} if it doesn't exist already.`);
            console.error(`   2. Copy ${colors.bgGray}macros.json.example${colors.reset} to ${colors.bgGray}macros.json${colors.reset}`)
            console.error(`   3. Edit ${colors.bgGray}macros.json${colors.reset}`);
            logger.error(error.stack)
        } else if (error instanceof SyntaxError) {
            console.error(`${colors.red}Invalid JSON format in macros.json:${colors.reset}\n`);
            console.error(error.message);
            logger.error(error.stack)
        } else {
            console.error(`${colors.red}Unexpected error loading macros.json:${colors.reset}\n`);
            console.error(error.message);
            logger.error(error.stack)
        }
        process.exitCode = 1
    }
}