export const colors = {
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
    bgWhite: "\x1b[47m"
}

export function displayHelp() {
    console.log(`${colors.green}Available options:${colors.reset}`);
    console.log("")
    console.log(`  interact or keyboard: ${colors.gray}start interactive mode, press a key to run a macro`);
    console.log(`  you can customize the key mapping in macros.json ${colors.reset}`);
    console.log("");
    console.log(`  Customize your own commands by editing macros.json`);
    console.log(`  then run: ${colors.yellow}mcro${colors.reset} [command]`);
}