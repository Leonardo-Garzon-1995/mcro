import { runAction } from "./actions.js";
import { displayInteractiveMode } from "./helpers.js";
import { colors } from "./helpers.js";

export function runKeyboardMode(macros) {
    process.stdin.setEncoding("utf8");
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    process.stdin.resume();

    displayInteractiveMode()

    process.stdin.on("data", (key) => {
    if (key === "\u0003" || key === "q") {
        console.log(`${colors.red}Exit interactive mode.${colors.reset}`);
        process.exit(0); 
    }

    const macro = macros[key];
    if (macro) {
        console.log(`→ ${macro.label}`);
        runAction(macro.action);
    } else {
        const show = key === "\r" ? "Enter" : JSON.stringify(key);
        console.log(`${colors.red} -> No macro mapped for <${show}>${colors.reset}`);
    }
    });
}
