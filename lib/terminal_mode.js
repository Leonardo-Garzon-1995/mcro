import { runAction } from "./actions.js";
import { colors } from "./helpers.js";

export function runTerminalMode(macros, arg) {
    const cmd = macros[arg]

    if (!cmd) {
        console.log(`   ${colors.red}No macro mapped for ${colors.reset}<${arg}>`);
        return
    }

    try {
        console.log(`${colors.green}→${colors.reset} ${cmd.label}`);
        runAction(cmd.action);
    } catch (error) {
        console.log(`${colors.red}Error:${colors.reset} ${error.message}`);
    }
    
}