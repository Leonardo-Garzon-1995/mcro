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
        exec(`open -a "${app}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Failed to open app: ${error.message}`);
                return;
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
                return;
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
                return;
            }
        })
    }
}

function openURL(url) {
    if (process.platform === "darwin") {
        exec(`open "${url}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Failed to open URL: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
    } else if (process.platform === "win32") {
        exec(`start "" "${url}"`, { shell: "cmd.exe" }, (error, stdout, stderr) => {
            if (error) {
                console.log(`Failed to open URL: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
    } else {
        exec(`xdg-open "${url}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Failed to open URL: ${error.message}`);
                return;
            }
        });
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