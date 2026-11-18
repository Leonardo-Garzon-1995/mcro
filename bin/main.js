#!/usr/bin/env node
import setupConfigDirAndFiles from '../lib/config/setup.js';
import dispatchCommand from '../lib/index.js';
import * as logger from '../lib/log/logger.js'

function main() {
    try {
        setupConfigDirAndFiles();
        const [, , command, ...args] = process.argv;

        dispatchCommand(command, args)
    } catch (error) {
        logger.error(error.stack)
        console.error(error.message)
        process.exitCode = 1
    }  
}

main();


