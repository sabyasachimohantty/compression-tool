#!/usr/bin/env node
import { Command } from 'commander'
import decode from './decode.js';
import compress from './compress.js';

const program = new Command()

program
    .name('Comprezzz')
    .description('A simple file compression tool')
    .version('1.0.0')

program
    .command('compress')
    .argument('<file>')
    .description('Compress the given file')
    .action((file) => {
        compress(file)
    })

program
    .command('decompress')
    .argument('<file>')
    .description('Decompress the given file to its original form')
    .action((file) => {
        decode(file)
    })

program.parse(process.argv)