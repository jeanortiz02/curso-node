


import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
    .options('b', {
        alias: 'base',
        type: 'number',
        description: 'Base number',
        demandOption: true
    })
    .options('l', {
        alias: 'limit',
        type: 'number',
        description: 'Limit of multiplication table',
        default: 10
    })
    .options('s', {
        alias:'show',
        type:'boolean',
        description: 'Show multiplication table',
        default: false
    })
    .options('n', {
        alias: 'name',
        type:'string',
        default: 'multiplication-table',
        description: 'File name'
    })
    .options('d', {
        alias: 'destination',
        type:'string',
        default: 'outputs',
        description: 'File destination'
    })
    .check((argv, options) => {

        if( argv.b < 1 ) throw ('Base number must be a positive integer');
        

        return true;
    })
    .parseSync();