import fs from 'fs';
// FORMATTING
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",
    bgGray: "\x1b[100m"
}

function displayHelp() {
    console.log(`${colors.green}Available options:${colors.reset}`);
    console.log("")
    console.log(`  interact or keyboard: ${colors.gray}start interactive mode, press a key to run a macro`);
    console.log(`  you can customize the key mapping in macros.json ${colors.reset}`);
    console.log("");
    console.log(`  Customize your own commands by editing macros.json`);
    console.log(`  then run: ${colors.yellow}mcro${colors.reset} [command]`);
}

function displayInteractiveMode() {
    console.log(`📟${colors.green} CLI Interactive macros ready.${colors.reset}`);
    console.log(`   ⌨️ Press a key mapped in macros.json`);
    console.log(`   🚫 Press q or Ctrl+C to exit.\n`);
    console.log(`${colors.gray}` + "=".repeat(40) + `${colors.reset}\n`);
}

// VALIDATION
function isValidArg(arg) {
    return Object.keys(macrosByCommand).includes(arg) || Object.keys(macrosByKey).includes(arg);
}

function validateMacros(macros) {
    if (!Array.isArray(macros)) {
        throw new Error(`${colors.red}macros.json must be an array of objects${colors.reset}`);
    }
    if (macros.length === 0) {
        throw new Error(`${colors.red}macros.json must not be empty${colors.reset}`);
    }
    macros.forEach((macro, index) => {
        if (typeof macro !== "object") {
            throw new Error(`Macro at index ${index} is not an object`)
        }
        if (!macro.key || !macro.command || !macro.label || !macro.action) {
            throw new Error(`Macro at index ${index} is missing required fields`)
        }
        
    })
}

function loadMacros(path) {
    try {
        let data = JSON.parse(fs.readFileSync(path, "utf8"));
        validateMacros(data);
        return data
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`${colors.red}macros.json not found at path: ${path}${colors.reset}\n`);
            console.log(`You should:`);
            console.log(`1. Copy ${colors.bgGray}macros.json.example${colors.reset} to ${colors.bgGray}macros.json${colors.reset}`)
            console.log(`2. Edit ${colors.bgGray}macros.json${colors.reset}`);
        } else if (error instanceof SyntaxError) {
            console.log(`${colors.red}Invalid JSON in macros.json:${colors.reset}\n`);
            console.log(error.message);
        } else {
            console.log(`${colors.red}Unexpected error loading macros.json:${colors.reset}\n`);
            console.log(error.message);
        }
        process.exit(1);
    }
}

export {
    colors,
    displayHelp,
    loadMacros,
    displayInteractiveMode
}