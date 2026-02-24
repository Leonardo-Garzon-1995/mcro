import {exec} from 'child_process';



/**
 * Executes a command in the shell.
 * @param {string} cmd - The command to execute.
 * @example runCmd("node -v") - Prints the Node.js version.
 */
function runCmd(cmd) {
    exec(cmd, {shell: "cmd.exe"}, (error, stdout, stderr) => {
        if (error) {
            console.log(`Command execution failed: ${error.message}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        if (stdout) {
            console.log(stdout);
        }
    });
}


/**
 * Opens an application by its name/path.
 * @param {string} app - The name or path of the application to open.
 * @example openApp("C:/Program Files/Google/Chrome/Application/chrome.exe") - Opens Google Chrome on Windows.
 * @example openApp("/usr/bin/google-chrome") - Opens Google Chrome on Linux.
 */
function openApp(app) {

    if (process.platform === "darwin") {
        // For macOS - open by app name
        exec(`open -a "${app}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Failed to open app: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        })
    } else if (process.platform === "win32") {
        // For Windows - use Start-Process for PowerShell compatibility
        exec(`powershell -Command "Start-Process -FilePath '${app}'"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Failed to open app: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        })
    } else{
        // For Linux
        exec(`${app} >/dev/null 2>&1 &`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Failed to open app: ${error.message}`);
            }
        })
    }
}


/**
 * Opens a URL in the default web browser.
 * @param {string} url - The URL to open.
 * @example openURL("https://www.google.com") - Opens Google in the default web browser.
 */
function openURL(url) {
    if (process.platform === "darwin") {
        exec(`open "${url}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Failed to open URL: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
    } else if (process.platform === "win32") {
        exec(`start "" "${url}"`, { shell: "cmd.exe" }, (error, stdout, stderr) => {
            if (error) {
                console.log(`Failed to open URL: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
    } else {
        exec(`xdg-open "${url}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Failed to open URL: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
    }
}


/**
 * Executes an action based on the given type.
 * @param {object} action - The action to execute.
 * @property {string} action.type - The type of action to execute.
 * @property {string} [action.cmd] - The command to execute if type is "run_cmd".
 * @property {string} [action.path] - The path to the application to open if type is "open_app".
 * @property {string} [action.url] - The URL to open if type is "open_url".
 * @example runAction({type: "run_cmd", cmd: "node -v"}) - Prints the Node.js version.
 * @example runAction({type: "open_app", path: "/path/to/application.exe"}) - Opens the application at the given path.
 * @example runAction({type: "open_url", url: "https://www.google.com"}) - Opens Google in the default web browser.
 */
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