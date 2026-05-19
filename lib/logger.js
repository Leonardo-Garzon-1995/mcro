import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const LOG_DIR = path.join(__dirname, '..', 'logs')
const LOG_FILE = path.join(LOG_DIR, 'mcro.log')

function ensureLogFile() {
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, {recursive: true})
    }

    if (!fs.existsSync(LOG_FILE)) {
        fs.writeFileSync(LOG_FILE, '')
    }
}

function getTimestamp() {
    return new Date().toISOString()
}

function write(status, message) {
    ensureLogFile()

    const line = `[${getTimestamp()}] [${status}] ${message}\n`

    fs.appendFileSync(LOG_FILE, line)
}

function displayLogFile() {
    if (!fs.existsSync(LOG_FILE)) {
        console.log("No log file found.")
        return
    }
    const content = fs.readFileSync(LOG_FILE, 'utf-8')
    console.log(`\n--- Log File: ${LOG_FILE} ---\n`)
    console.log(content)
}

function getLogFileSize() {
    if (!fs.existsSync(LOG_FILE)) {
        return 
    }
    // s in bytes
    return fs.statSync(LOG_FILE).size
}

function displayLogFileSize() {
    const fileSize = getLogFileSize() 
    const fileSizeKB = (fileSize / 1024).toFixed(2)
    const msg = `The 'mcro.log' file is \x1b[33m${fileSizeKB}\x1b[0m KB. Consider cleaning it up.\n`
    if (fileSizeKB > 900) {
        warn(`The 'mcro.log' file is ${fileSizeKB} KB. Consider cleaning it up.`)
        console.log(`\n   \x1b[33m[WARN]\x1b[0m `, msg)
    }
    
}

function removeLogFile() {
    if (fs.existsSync(LOG_FILE)) {
        fs.unlinkSync(LOG_FILE)
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