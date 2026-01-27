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
    bgGray: "\x1b[100m",
    brightyellow: "\x1b[93m"
}

function displayHelp() {
    console.log("")
    console.log(`   ${colors.green}USAGE:${colors.reset}`);
    console.log(`       ${colors.brightyellow}tsk${colors.reset} <command> [options/arguments]\n`);
    console.log(`   ${colors.green}Available options:${colors.reset}\n`);
    console.log(`       ${colors.cyan}Interactive Mode commands:${colors.reset}`);
    console.log(`       interactive`);
    console.log(`       keyboard`);
    console.log("")
    console.log(`       ${colors.cyan}Terminal Mode commands:${colors.reset}`);
    console.log('       myCommands '.padEnd(21, ' ') + `lets you see all available commands in macros.json`);
    console.log('       keys '.padEnd(21, ' ') + `lets you see all available keys in macros.json`);
    console.log('       config '.padEnd(21, ' ') + `lets you add, delete, or update macros in macros.json`);
    console.log(`       <command>`.padEnd(21, ' ') + `execute a command mapped in macros.json\n`);
    
}

function displayConfigHelp() {
    console.log(`   Available options:`);
        console.log("   add, -a");
        console.log("   delete, -d");
        console.log("   update, -u");
}

function displayInteractiveMode() {
    console.log(`📟${colors.green} CLI Interactive macros ready.${colors.reset}`);
    console.log(`   ⌨️ Press a key mapped in macros.json`);
    console.log(`   🚫 Press q or Ctrl+C to exit.\n`);
    console.log(`${colors.gray}` + "=".repeat(40) + `${colors.reset}\n`);
}

// VALIDATION

function validateMacros(macros) {
    if (!Array.isArray(macros)) {
        throw new Error(`macros.json must be an array of objects`);
    }
    if (macros.length === 0) {
        throw new Error(`macros.json must not be empty`);
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

// MANAGE STORAGE
function saveMacros(macros, path) {
    fs.writeFileSync(path, JSON.stringify(macros, null, 2));
    
}
function loadMacros(path) {
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
            console.log(`${colors.red}macros.json not found at path: ${path}${colors.reset}\n`);
            console.log(`You should:`);
            console.log(`   1. Create ${colors.bgGray}macros.json${colors.reset} if it doesn't exist already.`);
            console.log(`   2. Copy ${colors.bgGray}macros.json.example${colors.reset} to ${colors.bgGray}macros.json${colors.reset}`)
            console.log(`   3. Edit ${colors.bgGray}macros.json${colors.reset}`);
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
    displayInteractiveMode,
    displayConfigHelp,
    saveMacros
}