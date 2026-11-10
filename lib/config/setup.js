import fs from 'fs'
import {
    MACROS_JSON_PATH,
    MCRO_CONFIG_DIR,
    MCRO_CONFIG_FILE
} from '../variables.js'

function ensureConfigDir() {
    fs.mkdirSync(MCRO_CONFIG_DIR, { recursive: true })
}

export default function setupConfigDirAndFiles() {
    ensureConfigDir()

    try {
       if (!fs.existsSync(MACROS_JSON_PATH)) fs.writeFileSync(MACROS_JSON_PATH, '[]', 'utf-8')
       if (!fs.existsSync(MCRO_CONFIG_FILE)) {
        fs.writeFileSync(MCRO_CONFIG_FILE,
            JSON.stringify({APP_URI: '', API_KEY: ''}, null, 2))
       }
    } catch (error) {
        throw new Error(`Error setting up config files: ${error.message}`)
    }
}

setupConfigDirAndFiles()
