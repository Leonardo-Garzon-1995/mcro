import {exec} from 'child_process';

function runCmd(cmd) {
    exec(cmd, {shell: "cmd.exe"}, (error, stdout, stderr) => {
        if (error) {
            console.log(`Command execution failed: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        if (stdout) {
            console.log(stdout);
        }
    });
}

function openApp(app) {

    if (process.platform === "darwin") {
        // For macOS - open by app name
        exec(`open -a "${app}"`)
    } else if (process.platform === "win32") {
        // For Windows - open by app full .exe path
        exec(`start "" "${app}"`, {shell: "cmd.exe"})
    } else{
        // For Linux
        exec(`${app} >/dev/null 2>&1 &`)
    }
}

function openURL(url) {
    if (process.platform === "darwin") {
        exec(`open "${url}"`);
    } else if (process.platform === "win32") {
        exec(`start "" "${url}"`, { shell: "cmd.exe" });
    } else {
        exec(`xdg-open "${url}"`);
    }
}

function runAction(action) {
    if (!action || !action.type) return;

    switch (action.type) {
        case "run_cmd":
            runCmd(action.cmd);
            break;
        case "open_app":
            openApp(action.path);
            break;
        case "open_url":
            openURL(action.url);
            break;
        default:
            console.log(`Unknown action type: ${action.type}`);
            break;
    }
}

export {
    runCmd,
    openApp,
    openURL,
    runAction
}