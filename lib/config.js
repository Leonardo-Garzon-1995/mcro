import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';


import { saveMacros, loadMacros, colors } from './helpers.js';


async function addMacro(path) {
    const rl = readline.createInterface({ input, output });
    let macros = loadMacros(path);

    const key = await rl.question(`${colors.cyan}Enter key: ${colors.reset}`);
    const command = await rl.question(`${colors.cyan}Enter command: ${colors.reset}`);
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

function deletetMacro(path, arg) {
    const macros = loadMacros(path);
    let updatedMacros = macros.filter(i => i.key !== arg);
    saveMacros(updatedMacros, path);
}


async function configOptions(arg, FILE) {
    if (!arg) {
        console.log("🎛  Please add a valid argument.");
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
            deletetMacro(FILE, process.argv[4]);
            console.log(`${colors.green}Macro '${process.argv[4]}' deleted successfully!${colors.reset}`);
            break;
        default:
            console.log(`${colors.red}Unknown option: ${colors.reset}${arg}`);
            break;
    } 

    process.exit(0);
}

export { configOptions };