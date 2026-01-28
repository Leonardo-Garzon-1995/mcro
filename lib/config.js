import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';


import { saveMacros, loadMacros, colors, displayConfigHelp } from './helpers.js';
/* Functions for the config command
    * addMacro - adds a macro to the macros.json file
    * deletetMacro - deletes a macro from the macros.json file
 */

const [,,,, ...args] = process.argv

async function addMacro(path) {
    const rl = readline.createInterface({ input, output });
    let macros = loadMacros(path);

    let key = await rl.question(`${colors.cyan}Enter key: ${colors.reset}`);
    while(macros.find(m => m.key === key)) {
        console.log(`${colors.red}Macro with key '${key}' already exists. Use a different key.${colors.reset}`);
        key = await rl.question(`${colors.cyan}Enter key: ${colors.reset}`);
    }

    let command = await rl.question(`${colors.cyan}Enter command: ${colors.reset}`);
    while(macros.find(m => m.command === command)) {
        console.log(`${colors.red}Macro with command '${command}' already exists. Use a different command.${colors.reset}`);
        command = await rl.question(`${colors.cyan}Enter command: ${colors.reset}`);
    }
    const label = await rl.question(`${colors.cyan}Enter label: ${colors.reset}`);
    let actionType = await rl.question(`${colors.cyan}Enter action type: ${colors.reset}`);
    if (actionType !== "open_app" && actionType !== "open_url" && actionType !== "run_cmd") {
        console.log(`${colors.red}Invalid action type: ${actionType}${colors.reset}`);
        console.log(`Available action types: ${colors.green}open_app, open_url, run_cmd${colors.reset}`);
        actionType = await rl.question(`${colors.cyan}Enter action type: ${colors.reset}`)
    }

    const macro = {
        key: key.toLowerCase().trim(),
        command: command.toLowerCase().trim(),
        label: label,
        action: {
            type: actionType,
        }
    }
    if (macro.action.type === "open_app") {
        macro.action.path = await rl.question(`${colors.cyan}Enter path: ${colors.reset}`);
    }
    if (macro.action.type === "open_url") {
        macro.action.url = await rl.question(`${colors.cyan}Enter url: ${colors.reset}`);
    }
    if (macro.action.type === "run_cmd") {
        macro.action.cmd = await rl.question(`${colors.cyan}Enter cmd: ${colors.reset}`);
    }

    macros.push(macro);
    saveMacros(macros, path);


    rl.close();
}

async function updateMacro(path, key, attr) {
    const rl = readline.createInterface({ input, output });
    const macros = loadMacros(path)
    if (!key || typeof key === "undefined") {
        console.log("Please enter a valid key value")
        return
    }
    if (!attr || typeof attr === "undefined") {
        console.log("Please enter a valid attribute value")
        return
    }
    const macro = macros.find(m => m.key === key)
    const macroIndex = macros.indexOf(macro)
    
    switch (attr) {
        case "label":
            macro.label = await rl.question(`${colors.cyan}Enter label: ${colors.reset}`);
            break;
        case "command":
            macro.command = (await rl.question(`${colors.cyan}Enter command: ${colors.reset}`)).toLowerCase().trim().trim();
            break;
        case "action":
            macro.action.type = await rl.question(`${colors.cyan}Enter action type: ${colors.reset}`);
            if (macro.action.type === "open_app") {
                macro.action.path = await rl.question(`${colors.cyan}Enter path: ${colors.reset}`);
            }
            if (macro.action.type === "open_url") {
                macro.action.url = await rl.question(`${colors.cyan}Enter url: ${colors.reset}`);
            }
            if (macro.action.type === "run_cmd") {
                macro.action.cmd = await rl.question(`${colors.cyan}Enter cmd: ${colors.reset}`);
            }
            break;
        default:
            console.log(`${colors.red}Invalid attribute: ${colors.reset}${attr}`);
            break;

    }

    macros[macroIndex] = macro
    saveMacros(macros, path)
    console.log(`Macro '${key}' has been updated!`)

    rl.close();
}

function deletetMacro(path, arg) {
    const macros = loadMacros(path);
    let updatedMacros = macros.filter(i => i.key !== arg);
    saveMacros(updatedMacros, path);
}


async function configOptions(arg, FILE) {
    if (!arg) {
        console.log("   Please add a valid config option.\n");
        displayConfigHelp();
        process.exit(0);
    }
    switch (arg) {
        case "-a":
        case "add":
            await addMacro(FILE);
            console.log(`${colors.green}Macro added successfully!${colors.reset}`);
            break;
        case "-d":
        case "delete":
            deletetMacro(FILE, args[0]);
            console.log(`${colors.green}Macro '${process.argv[4]}' deleted successfully!${colors.reset}`);
            break;
        case "-u":
        case "update":
            await updateMacro(FILE, args[0], args[1]);
            break;
        default:
            console.log(`   ${colors.red}Unknown option: ${colors.reset}${arg}\n`);
            displayConfigHelp();
            break;
    } 

    process.exit(0);
}

export { configOptions };