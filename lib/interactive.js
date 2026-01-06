import { runAction } from "./actions.js";

export function runKeyboardMode(macros) {
    process.stdin.setEncoding("utf8");
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    process.stdin.resume();

    console.log("🎛  Mini Macropad ready.");
    console.log("➡  Press a key mapped in macros.json");
    console.log("⎋  Press q or Ctrl+C to exit.\n");

    process.stdin.on("data", (key) => {
    if (key === "\u0003" || key === "q") process.exit(0); 

    const macro = macros[key];
    if (macro) {
        console.log(`→ ${macro.label}`);
        runAction(macro.action);
    } else {
        const show = key === "\r" ? "Enter" : JSON.stringify(key);
        console.log(`(no macro mapped for ${show})`);
    }
    });
}
