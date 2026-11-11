import { runAction } from "./actions.js";
import { colors } from "./helpers.js";
import * as logger from './log/logger.js'

export function runTerminalMode(macros, arg) {
    const cmd = macros[arg]

    if (!cmd) {
        logger.warn(`Invalid command '${arg}'`)
        console.log(`   ${colors.red}No macro mapped for ${colors.reset}<${arg}>`);
        return
    }

    try {
        console.log(`${colors.green}→${colors.reset} ${cmd.label}`);
        logger.info(`Executing '${cmd.command}' command - ${cmd.label}`)
        runAction(cmd.action);
    } catch (error) {
        logger.error(error.stack)
        console.log(`${colors.red}Error:${colors.reset} ${error.message}`);
    }
    
}