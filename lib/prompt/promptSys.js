import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import * as logger from '../log/logger.js'

export default class Prompt {
    
    static async ask(message) {
        const rl = readline.createInterface({
            input,
            output,
            terminal: false
        })

        try {

            logger.info('Prompt initialized.')

            return await rl.question(message)
        } catch (error) {
            logger.error(error)
            throw new Error(error)
        } finally {
            logger.info('promt finalized')
            rl.close()
        }
    } 
}

