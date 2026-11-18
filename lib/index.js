// DISPATCHER
import { runKeyboardMode } from './interactive.js'; 
import { runTerminalMode } from './terminal_mode.js';
import { configOptions } from './config/config.js';
import { displayHelp, colors} from './helpers.js';
import { loadMacros } from './storage/storage.js';
import { MACROS_JSON_PATH} from './variables.js'
import * as logger from './log/logger.js'

const rawMacros = loadMacros(MACROS_JSON_PATH);
const macrosByKey = Object.fromEntries(rawMacros.map(obj => [obj.key, obj]))
const macrosByCommand = Object.fromEntries(rawMacros.map(obj => [obj.command, obj]))


export default function dispatchCommand(command, args) {
    if (!command) {
        console.log("Please enter a valid command.");
        logger.warn(`No command provided. Displayed help message.`)
        displayHelp();
        return;
    }
    
    switch(command) {
        case "help":
        case "-h":
            displayHelp();
            break;
        case "config":
            configOptions(args[0], MACROS_JSON_PATH);
            break;
        case "keys":
            if (rawMacros.length === 0) {
                throw new Error("No macros found.\n Use: 'mcro config add' to add a new macro.")
            }
            console.log(`\n${colors.green}Available keys:${colors.reset}`);
            rawMacros.sort((a, b) => a.key.localeCompare(b.key)).forEach(obj => console.log(`  ${colors.cyan}${obj.key}${colors.reset}: ${obj.label}`));
            break;
        case "myCommands":
            if (rawMacros.length < 1) {
                throw new Error("No macros found.\n Use: 'mcro config add' to add a new macro.")
            }
            console.log(`\n${colors.green}Available commands:${colors.reset}`);
            rawMacros.sort((a, b) => a.command.localeCompare(b.command)).forEach(obj => console.log(`  ${colors.cyan}${obj.command}${colors.reset}: `.padEnd(22, ' ') + `${obj.label}`))
            break;
        case "interactive":
        case "keyboard":
            runKeyboardMode(macrosByKey);
            break;
        default:
            runTerminalMode(macrosByCommand, command);
            break;
    }
}