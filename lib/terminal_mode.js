import { runAction } from "./actions.js";
import { colors } from "./helpers.js";

export function runTerminalMode(macros, key) {
    const cmd = macros[key]

    if (!cmd) {
        console.log(`${colors.red}No macro mapped for ${colors.reset}<${colors.bgGray}${key}${colors.reset}>`);
        return
    }

    console.log(`${colors.green}→${colors.reset} ${cmd.label}`);
    runAction(cmd.action);
}