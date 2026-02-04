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

function executeMacrosProgram(arg) {

    if (!arg) {
        console.log("Please add a valid command.");
        displayHelp();
    }

    if (arg === "config") {
        configOptions(args[0], macrosPath);
    }

    if (arg === "keys") {
        console.log(`\n${colors.green}Available keys:${colors.reset}`);
        rawMacros.forEach(obj => console.log(`  ${colors.cyan}${obj.key}${colors.reset}: ${obj.label}`));
        
    }

    if (arg === "myCommands") {
        console.log(`\n${colors.green}Available commands:${colors.reset}`);
        rawMacros.forEach(obj => console.log(`  ${colors.cyan}${obj.command}${colors.reset}: `.padEnd(22, ' ') + `${obj.label}`));
    }

    if (arg === "interactive" || arg === "keyboard") {
        runKeyboardMode(macrosByKey);
    } else {
        if (arg === "keys" || arg === "myCommands" || arg === "config" || !arg) return;
        runTerminalMode(macrosByCommand, arg);
        
    }
}

executeMacrosProgram(command);


