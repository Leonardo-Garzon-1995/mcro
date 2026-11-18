import Prompt from '../prompt/promptSys.js';
import Macro from './macro.js';
import * as logger from '../log/logger.js'


import {colors, displayConfigHelp } from '../helpers.js';
import { saveMacros, loadMacros } from '../storage/storage.js';

const [,,,, ...args] = process.argv


async function addMacro(path) {
    let macros = loadMacros(path);
    // if (!macros || macros.length === 0) {
    //     console.log('No macros found')
    //     return
    // }

    try {
        let key = await Prompt.ask(`${colors.cyan}Enter key: ${colors.reset}`);
        while (!key || typeof key !== "string" || key.trim().length > 1) {
            console.log(`${colors.red}Invalid key. Please enter a single character string.${colors.reset}`);
            key = await Prompt.ask(`${colors.cyan}Enter key: ${colors.reset}`);
            
        }
        while(macros.find(m => m.key === key)) {
            console.log(`${colors.red}A macro with the key '${key}' already exists. Use a different key.${colors.reset}`);
            key = await Prompt.ask(`${colors.cyan}Enter key: ${colors.reset}`);
        }

        let command = await Prompt.ask(`${colors.cyan}Enter command: ${colors.reset}`);
        while(macros.find(m => m.command === command)) {
            console.log(`${colors.red}Macro with command '${command}' already exists. Use a different command.${colors.reset}`);
            command = await Prompt.ask(`${colors.cyan}Enter command: ${colors.reset}`);
        }
        let label = await Prompt.ask(`${colors.cyan}Enter label: ${colors.reset}`);
        let actionType = await Prompt.ask(`${colors.cyan}Enter action type: ${colors.reset}`);
        if (actionType !== "open_app" && actionType !== "open_url" && actionType !== "run_cmd") {
            console.log(`${colors.red}Invalid action type: ${actionType}${colors.reset}`);
            console.log(`Available action types: ${colors.green}open_app, open_url, run_cmd${colors.reset}`);
            actionType = await Prompt.ask(`${colors.cyan}Enter action type: ${colors.reset}`)
        }

        let macro = new Macro(key, label, command, { type: actionType });
        if (macro.action.type === "open_app") {
            macro.action.path = await Prompt.ask(`${colors.cyan}Enter path: ${colors.reset}`);
        }
        if (macro.action.type === "open_url") {
            macro.action.url = await Prompt.ask(`${colors.cyan}Enter url: ${colors.reset}`);
        }
        if (macro.action.type === "run_cmd") {
            macro.action.cmd = await Prompt.ask(`${colors.cyan}Enter cmd: ${colors.reset}`);
        }

        macros.push(macro);
        saveMacros(macros, path);

        console.log(`\n${colors.green}Macro added successfully!${colors.reset}`);

    } catch (error) {
        if (error.code === 'ABORT_ERR') return
        console.log(`\n${error.code}`);
    }
}

async function updateMacro(path, key, attr) {
    const macros = loadMacros(path)
    if (!macros || macros.length === 0) {
        console.log('No macros found')
        return
    }
    const macro = macros.find(m => m.key === key)

    if (!key || typeof key !== "string") {
        console.log("   Please enter a valid key value")
        return
    }
    if (!attr || typeof attr === "undefined") {
        console.log("   Please enter a valid attribute value")
        return
    }
    if (!macro) {
        console.log(`The key '${key}' is not mapped in macros.json.`)
        console.log(`To add a new macro use:
        ${colors.brightyellow}mcro${colors.reset} config add `)
        return
    }

    try {
        const macroIndex = macros.indexOf(macro)
        
        switch (attr) {
            case "label":
                macro.label = await Prompt.ask(`${colors.cyan}Enter label: ${colors.reset}`);
                break;
            case "command":
                macro.command = (await Prompt.ask(`${colors.cyan}Enter command: ${colors.reset}`)).toLowerCase().trim().trim();
                break;
            case "action":
                macro.action = {};
                macro.action.type = await Prompt.ask(`${colors.cyan}Enter action type: ${colors.reset}`);
                if (macro.action.type === "open_app") {
                    macro.action.path = await Prompt.ask(`${colors.cyan}Enter path: ${colors.reset}`);
                }
                if (macro.action.type === "open_url") {
                    macro.action.url = await Prompt.ask(`${colors.cyan}Enter url: ${colors.reset}`);
                }
                if (macro.action.type === "run_cmd") {
                    macro.action.cmd = await Prompt.ask(`${colors.cyan}Enter cmd: ${colors.reset}`);
                }
                break;
            default:
                console.log(`${colors.red}Invalid attribute: ${colors.reset}${attr}`);
                break;
        }

        macros[macroIndex] = macro
        saveMacros(macros, path)
        console.log(`Macro '${key}' has been updated!`)

    } catch (error) {
        console.log(`\n${error}`);
    }
}

async function deletetMacro(path, arg) {
    if (!arg || typeof arg !== "string") {
        console.log("Please add a valid key value")
        return
    }
    const macros = loadMacros(path);
    if (!macros.find(m => m.key === arg)) {
        console.log(`The key '${arg}' is not mapped in macros.json.`)
        return
    }

    let approval = await Prompt.ask(`Are you sure you want to delete ${arg} from macros.json [y/n]: `)
    if (approval.trim() === 'y' || approval.trim() === 'Y' || approval.trim() === 'yes' || approval.trim() === 'YES') {
        let updatedMacros = macros.filter(i => i.key !== arg);

        saveMacros(updatedMacros, path);
        console.log(`${colors.green}Macro '${arg}' deleted successfully!${colors.reset}`);
    } else {
        return
    }
}

function viewMacroInfo(pathFile, key) {
    const macros = loadMacros(pathFile);
    if (!macros || macros.length === 0) {
        console.log(`No macros found`);
        return;
    }
    const macro = macros.find(m => m.key === key.trim().toLowerCase());
    if (!macro) {
        console.log(`${colors.red}Macro with key '${key}' not found.${colors.reset}`);
        return;
    }
    console.log(macro);
}

function displayAllMacrosInfo(path) {
    const macros = loadMacros(path)
    if (!macros || macros.length === 0) {
        console.log(`No macros found.`);
        return;
    }
    try {
        console.log('')
        console.log('COMMAND'.padEnd(10) + 'KEY'.padEnd(6) + 'ACTION'.padEnd(12) + 'LABEL'.padEnd(35) + 'EXECUTION')
        console.log('-'.repeat(80))

        for (const macro of macros) {
            const cmd = macro.command 
            const key = macro.key
            const act = macro.action.type
            const label = macro.label

            let exec = ''
            if (act === 'open_app') {
                exec = macro.action.path
            } else if (act === 'open_url') {
                exec = macro.action.url
            } else {
                exec = macro.action.cmd
            }


            console.log(colors.cyan + cmd.padEnd(10) + colors.reset + colors.brightyellow +` ${key}`.padEnd(6) + colors.reset + act.padEnd(12) + label.padEnd(35) + exec.slice(0, 50) + '...')
        }
        console.log('-'.repeat(80) + '\n')
    } catch (error) {
        console.error(error.message)
    }
}


async function configOptions(arg, FILE) {
    if (!arg) {
        console.log("   Please enter a valid config option.\n");
        displayConfigHelp();
        process.exit(0);
    }

    logger.displayLogFileSize()

    if (arg === 'delete-log') {
        logger.removeLogFile()
        process.exit(0);
    }
    switch (arg) {
        case "-a":
        case "add":
            await addMacro(FILE);
            break;
        case "-d":
        case "delete":
            await deletetMacro(FILE, args[0]);
            break;
        case "-u":
        case "update":
            await updateMacro(FILE, args[0], args[1]);
            break;
        case "-v":
        case "view":
            viewMacroInfo(FILE, args[0]);
            break;
        case 'view-all':
        case '-va':
            displayAllMacrosInfo(FILE)
            break
        case 'log-info':
            logger.displayLogFile()
            break;
        default:
            console.log(`   ${colors.red}Unknown option ${colors.reset}<${arg}>\n`);
            displayConfigHelp();
            break;
    } 

    logger.info(`Executed 'config' command ${arg}`)

    process.exit(0);
}


export { configOptions };