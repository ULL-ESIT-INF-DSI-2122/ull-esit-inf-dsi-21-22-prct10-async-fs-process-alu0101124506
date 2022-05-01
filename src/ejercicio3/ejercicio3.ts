const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');
import {Watcher} from './watcher';

const error = chalk.red;


 function main(): void {
  yargs.command({
    command: 'watch',
    describe: 'Vigila cambios en los archivos del usuario',
    builder: {
      user: {
        describe: 'Nombre de usuario',
        demandOption: true,
        type: 'string',
        alias: 'u',
      },
      rute: {
        describe: 'Ruta donde se encuentran los usurios',
        demandOption: true,
        type: 'string',
        alias: 'r',
      },  
    },
    handler(argv) {
      if (typeof argv.user === 'string' && typeof argv.rute === 'string') {
        const newWatcher = new Watcher(argv.user, argv.rute);
      } else {
        console.log(error("Comando incorrecto"));
      }
    },
  });
  yargs.parse();
 }

 main();