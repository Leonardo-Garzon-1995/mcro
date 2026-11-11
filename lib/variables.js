import path from 'path'
import os from 'os'

// Config paths
const MCRO_CONFIG_DIR = path.join(os.homedir(), '.mcro')
const MCRO_CONFIG_FILE = path.join(MCRO_CONFIG_DIR, 'config.json')
const MACROS_JSON_PATH = path.join(MCRO_CONFIG_DIR, 'macros.json')
const LOG_DIR = path.join(MCRO_CONFIG_DIR, 'logs')
const LOG_FILE = path.join(LOG_DIR, 'mcro.log')

export {
    MCRO_CONFIG_DIR,
    MCRO_CONFIG_FILE,
    MACROS_JSON_PATH,
    LOG_DIR,
    LOG_FILE
}
