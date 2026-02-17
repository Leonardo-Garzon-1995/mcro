#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';

import { runKeyboardMode } from '../lib/interactive.js'; 
import { runTerminalMode } from '../lib/terminal_mode.js';
import { configOptions } from '../lib/config.js';
import { displayHelp, colors, loadMacros } from '../lib/helpers.js';

const [, , command, ...args] = process.argv;

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const macrosPath = path.join(__dirname, "..", 'macros.json');

let rawMacros = loadMacros(macrosPath);
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
        displayHelp();
        return;
    }

    switch(cmd) {
        case "help":
        case "-h":
            displayHelp();
            break;
        case "config":
            configOptions(args[0], FilePath);
            break;
        case "keys":
            console.log(`\n${colors.green}Available keys:${colors.reset}`);
            rawMacros.forEach(obj => console.log(`  ${colors.cyan}${obj.key}${colors.reset}: ${obj.label}`));
            break;
        case "myCommands":
            console.log(`\n${colors.green}Available commands:${colors.reset}`);
            rawMacros.forEach(obj => console.log(`  ${colors.cyan}${obj.command}${colors.reset}: `.padEnd(22, ' ') + `${obj.label}`));
            break;
        case "interactive":
        case "keyboard":
            runKeyboardMode(macrosByKey);
            break;
        default:
            runTerminalMode(macrosByCommand, cmd);
            break;
    }
}

executeMacrosProgram(command, macrosPath);


