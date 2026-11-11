import fs from 'fs'
import { spawn } from 'child_process'
import { LOG_FILE } from '../variables.js'


function getTimestamp() {
    return new Date().toISOString()
}

function write(status, message) {

    const line = `[${getTimestamp()}] [${status}] ${message}\n`

    fs.appendFileSync(LOG_FILE, line)
}

function displayLogFile() {
    if (!fs.existsSync(LOG_FILE)) {
        console.log("No log file found.")
        return
    }

    console.log(`\n--- Opened Log File: ${LOG_FILE} ---\n`)
    
    const openProcess = spawn('cmd', ['/c', 'start', '', LOG_FILE], {shell: true, detached: true})

    openProcess.on('exit', (code) => {
        console.info(`Log file process exited with code: ${code}`)
    })

    openProcess.on('error', (error) => {
        console.error('Faild to start Log file process')
    })

}

function getLogFileSize() {
    if (!fs.existsSync(LOG_FILE)) {
        return 
    }
    // s in bytes
    return fs.statSync(LOG_FILE).size
}

// The standard for oversize log files is 900 KB
function displayLogFileSize() {
    const fileSize = getLogFileSize() 
    const fileSizeKB = (fileSize / 1024).toFixed(2)
    const msg = `The 'mcro.log' file is \x1b[33m${fileSizeKB}\x1b[0m KB. Consider cleaning it up.\n`
    if (fileSizeKB > 90) {
        warn(`The 'mcro.log' file is ${fileSizeKB} KB. Consider cleaning it up.`)
        console.log(`\n   \x1b[33m[WARN]\x1b[0m `, msg)
    }
    
}

function removeLogFile() {
    if (fs.existsSync(LOG_FILE)) {
        fs.unlinkSync(LOG_FILE)
    } else {
        return
    }
}

function error(msg) {
    write('ERROR', msg)
}

function info(msg) {
    write('INFO', msg)
}

function debug(msg) {
    write('DEBUG', msg)
}

function warn(msg) {
    write('WARN', msg)
}

export {
    error,
    info,
    debug,
    warn,
    removeLogFile,
    displayLogFile,
    getLogFileSize,
    displayLogFileSize
}