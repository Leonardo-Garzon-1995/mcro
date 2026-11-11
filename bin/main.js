#!/usr/bin/env node

import { MACROS_JSON_PATH } from '../lib/variables.js'
import setupConfigDirAndFiles from '../lib/config/setup.js';
import { runKeyboardMode } from '../lib/interactive.js'; 
import { runTerminalMode } from '../lib/terminal_mode.js';
import { configOptions } from '../lib/config/config.js';
import { displayHelp, colors, loadMacros } from '../lib/helpers.js';
import * as logger from '../lib/log/logger.js'

const [, , command, ...args] = process.argv;
setupConfigDirAndFiles();

let rawMacros = loadMacros(MACROS_JSON_PATH);
const macrosByKey = Object.fromEntries(rawMacros.map(obj => [obj.key, obj]))
const macrosByCommand = Object.fromEntries(rawMacros.map(obj => [obj.command, obj]))

// ===========================================================================

/**
 * Execute the macros program with the given command.
 * @param {string} cmd - The command to execute.
 * @param {string} FilePath - The path to the macros storage file.
 * @example executeMacrosProgram("help") - Displays the help message.
 * @example executeMacrosProgram("config") - Opens the configuration tool.
 * @example executeMacrosProgram("keys") - Displays the available key bindings.
 * @example executeMacrosProgram("myCommands") - Displays the available commands.
 * @example executeMacrosProgram("interactive") - Enters interactive mode.
 * @example executeMacrosProgram("keyboard") - Enters interactive mode.
 * @example executeMacrosProgram("github") - Runs the macro with the given command.
 */
function executeMacrosProgram(cmd, FilePath) {
    if (!cmd) {
        console.log("Please enter a valid command.");
        logger.warn(`No command provided. Displayed help message.`)
        displayHelp();
        return;
    }

    try {
        switch(cmd) {
            case "help":
            case "-h":
                displayHelp();
                break;
            case "config":
                configOptions(args[0], FilePath);
                break;
            case "keys":
                if (rawMacros.length === 0) {
                    console.log(`No marcros found`)
                    console.log(`Use: 'mcro config add' to add a new macro`)
                    return 
                }
                console.log(`\n${colors.green}Available keys:${colors.reset}`);
                rawMacros.sort((a, b) => a.key.localeCompare(b.key)).forEach(obj => console.log(`  ${colors.cyan}${obj.key}${colors.reset}: ${obj.label}`));
                logger.info(`Requested display of commands' keys`)
                break;
            case "myCommands":
                if (rawMacros.length < 1) {
                    console.log(`No marcros found`)
                    console.log(`Use: 'mcro config add' to add a new macro`)
                    return 
                }
                console.log(`\n${colors.green}Available commands:${colors.reset}`);
                rawMacros.sort((a, b) => a.command.localeCompare(b.command)).forEach(obj => console.log(`  ${colors.cyan}${obj.command}${colors.reset}: `.padEnd(22, ' ') + `${obj.label}`));
                logger.info(`Requested display of commands' list`)
                break;
            case "interactive":
            case "keyboard":
                runKeyboardMode(macrosByKey);
                break;
            default:
                runTerminalMode(macrosByCommand, cmd);
                break;
        }
    } catch (error) {
        console.error(error.message);
        logger.error(`Error occurred while executing command '${cmd}': ${error}`)
    }
}

executeMacrosProgram(command, MACROS_JSON_PATH);


