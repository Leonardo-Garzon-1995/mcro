import { runAction } from "./actions.js";
import { displayInteractiveMode } from "./helpers.js";
import { colors } from "./helpers.js";
import * as logger from './logger.js'

export function runKeyboardMode(macros) {
    process.stdin.setEncoding("utf8");
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    process.stdin.resume();

    displayInteractiveMode()
    logger.info('Interactive mode initialize')

    process.stdin.on("data", (key) => {
    if (key === "\u0003" || key === "q") {
        logger.info('exited interactive mode')
        console.log(`\n${colors.red}Exiting interactive mode.${colors.reset}`);
        process.exit(0); 
    }

    const macro = macros[key];
    if (macro) {
        console.log(`${colors.green}→${colors.reset} ${macro.label}`);
        runAction(macro.action);
    } else {
        const show = key === "\r" ? "Enter" : JSON.stringify(key);
        console.log(`${colors.red} → No macro mapped for <${show}>${colors.reset}`);
    }
    });
}
