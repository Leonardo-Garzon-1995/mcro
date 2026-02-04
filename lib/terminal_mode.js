import { runAction } from "./actions.js";
import { colors } from "./helpers.js";

export function runTerminalMode(macros, arg) {
    const cmd = macros[arg]

    if (!cmd) {
        console.log(`${colors.red}No macro mapped for ${colors.reset}<${colors.bgGray}${arg}${colors.reset}>`);
        return
    }

    console.log(`${colors.green}→${colors.reset} ${cmd.label}`);
    runAction(cmd.action);
}