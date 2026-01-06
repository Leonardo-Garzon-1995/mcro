import { runAction } from "./actions.js";

export function runTerminalMode(macros, key) {
    const cmd = macros[key]

    if (!cmd) {
        console.log(`(no macro mapped for ${key})`);
    }

    console.log(`→ ${cmd.label}`);
    runAction(cmd.action);
}