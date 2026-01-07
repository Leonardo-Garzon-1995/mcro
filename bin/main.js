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

let rawMacros = JSON.parse(fs.readFileSync(macrosPath, 'utf-8'));


// Hot-reload macros when you edit macros.json
function hotReloadMacros() {
    fs.watchFile(macrosPath, () => {
    try {
        rawMacros = JSON.parse(fs.readFileSync(macrosPath, "utf8"));
        console.log("↻ Reloaded macros.json");
    } catch (error) {
        console.error("⚠️ macros.json invalid:", error.message);
    }
}); 
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


