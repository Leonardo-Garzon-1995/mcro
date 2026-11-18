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
    console.log(`       ${colors.brightyellow}mcro${colors.reset} <command> [options/arguments]\n`);
    console.log(`   ${colors.green}Available commands:${colors.reset}\n`);
    console.log(`       ${colors.cyan}Interactive Mode commands:${colors.reset}`);
    console.log(`       interactive`);
    console.log(`       keyboard`);
    console.log("")
    console.log(`       ${colors.cyan}Terminal Mode commands:${colors.reset}`);
    console.log('       myCommands '.padEnd(21, ' ') + `lets you see all available commands in macros.json`);
    console.log('       keys '.padEnd(21, ' ') + `lets you see all available keys in macros.json`);
    console.log('       config '.padEnd(21, ' ') + `lets you add, delete, view or update macros in macros.json`);
    console.log(`       <command>`.padEnd(21, ' ') + `execute a command mapped in macros.json\n`);
    console.log(`       help, -h `.padEnd(21, ' ') + `displays this help message`);
    console.log("")
}

function displayConfigHelp() {
    console.log(`   ${colors.green}Available options:${colors.reset}`);
    console.log(`   add, -a`);
    console.log(`   update, -u`.padEnd(16, ' ') + `${colors.gray}<key> <attribute>${colors.reset}`);
    console.log(`   delete, -d`.padEnd(16, ' ') + `${colors.gray}<key>${colors.reset}`);
    console.log(`   view, -v`.padEnd(16, ' ') + `${colors.gray}<key>${colors.reset}`);
    console.log(`   view-all, -va`.padEnd(16, ' '));
    console.log(`   log-info`.padEnd(16, ' ') + `${colors.gray}display the content of 'mcro.log' file${colors.reset}`);
    console.log(`   delete-log`.padEnd(16, ' ') + `${colors.gray}delete the 'mcro.log' file${colors.reset}`)
    console.log("")
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

    macros.forEach((macro, index) => {
        if (typeof macro !== "object") {
            throw new Error(`Macro at index ${index} is not an object`)
        }
        if (!macro.key || !macro.command || !macro.label || !macro.action) {
            throw new Error(`Macro at index ${index} is missing required fields`)
        }
    })
}

export {
    colors,
    displayHelp,
    displayInteractiveMode,
    displayConfigHelp,
    validateMacros
}