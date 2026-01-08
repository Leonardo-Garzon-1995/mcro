#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runKeyboardMode } from '../lib/interactive.js'; 
import { runTerminalMode } from '../lib/terminal_mode.js';
import { displayHelp, colors } from '../lib/helpers.js';

const [, , command] = process.argv;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const macrosPath = path.join(__dirname, "..", 'macros.json');

if (!fs.existsSync(macrosPath)) {
    console.log(`${colors.red}macros.json not found${colors.reset}`);
    console.log(`You should copy ${colors.bgGray}macros.json.example${colors.reset} to macros.json`);
    process.exit(1);
}

let rawMacros = loadMacros(macrosPath);

function loadMacros(path) {
    try {
    return JSON.parse(fs.readFileSync(path, "utf8"));
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`${colors.red}macros.json not found${colors.reset}`);
            console.log(`You should copy ${colors.bgGray}macros.json.example${colors.reset} to macros.json`);
        }
        if (error instanceof SyntaxError) {
            console.log(`${colors.red}macros.json invalid:${colors.reset}`, error.message);
        }
        process.exit(1);
    }
}


const macrosByKey = Object.fromEntries(rawMacros.map(obj => [obj.key, obj]))
const macrosByCommand = Object.fromEntries(rawMacros.map(obj => [obj.command, obj]))

// ===========================================================================

function executeMacrosProgram(arg) {

    if (!arg) {
        console.log("🎛  Please add a valid argument.");
        displayHelp();
        return
    }

    if (arg === "keys") {
        rawMacros.forEach(obj => console.log(`${colors.cyan}${obj.key}${colors.reset}: ${obj.label}`));
    }

    if (arg === "myCommands") {
        rawMacros.forEach(obj => console.log(`${colors.cyan}${obj.command}${colors.reset}: ${obj.label}`));
    }

    if (arg === "interactive" || arg === "keyboard") {
        runKeyboardMode(macrosByKey);
    } else {
        if (arg === "keys" || arg === "myCommands") return;
        runTerminalMode(macrosByCommand, arg);
    }
}

executeMacrosProgram(command);
// hotReloadMacros();


