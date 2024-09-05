#!/usr/bin/env node

import { Command } from "commander";
import readline from 'readline';
import { add, del } from './controller/operations.js';
import { createSession } from "./controller/session.js";
const program = new Command();


program
    .command('login <userId>')
    .description('Start an interactive session with a specific user ID')
    .action((userId) => {
        startSession(userId);
    });

program
    .command('add')
    .description('Add an expense with description and amount')
    .requiredOption('--desc <description>', 'Description of the expense')
    .requiredOption('--amt <amount>', 'Amount of the expense')
    .action((options) => {
        const { desc, amt } = options;
        
        add(desc, amt);
    });

program
    .command('del')
    .description('Delete an expense by description')
    .requiredOption('--desc <description>', 'Description of the expense to delete')
    .action((options) => {
        const { desc } = options;
        del(desc);
    });

program.parse(process.argv);


function startSession(userId) {
    const session = createSession(userId);
    console.log(`Session started for user ${userId}: ${session.sessionId}`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'expense> '
    });

    rl.prompt();

    rl.on('line', (line) => {
        const [command, ...args] = line.trim().split(' ');

        switch (command) {
            case 'add':
                program.parse(['node', 'index.js', 'add', ...args]);
                break;
            case 'del':
                program.parse(['node', 'index.js', 'del', ...args]);
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log(`Unknown command: ${command}`);
                break;
        }
        rl.prompt();
    }).on('close', () => {
        console.log('Session ended.');
        process.exit(0);
    });
}
