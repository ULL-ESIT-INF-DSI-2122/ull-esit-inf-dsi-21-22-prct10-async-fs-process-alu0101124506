import * as yargs from 'yargs';
import {Note} from './note';
import {NotePad} from './notepad';

const spawn = require('child_process').spawn;


/**
 * Usamos yargs para detallar los comandos que se podran usar por terminal
 * 
 * Primero tenemos el de añadir una nota
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Text of the note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.body === 'string' &&
    typeof argv.color == 'string' && typeof argv.user === 'string') {
      const newNote = new Note(argv.title, argv.body, argv.color);
      const ls = spawn('ls');
      let lsOutput = '';
      ls.stdout.on('data', (piece) => lsOutput += piece);
      const lsSplit = lsOutput.split(/\s+/);
      const i = lsSplit.findIndex((element) => element ==
      argv.user);
      const aux = new NotePad(argv.user);
      if (i == -1) {
        spawn('mkdir', [`${argv.user}`]);
      }
      aux.addNote(newNote);
    }
  },
});


/**
 * Comando con yards para listar todas las notas que hay creadas
 */
yargs.command({
  command: 'list',
  describe: 'List the titles of the notes of a particular user',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const aux = new NotePad(argv.user);
      aux.listTitle();
    }
  },
});


/**
 * Comando con yards para leer una nota especifica
 */
yargs.command({
  command: 'read',
  describe: 'Read a particular note of the user specified',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      const aux = new NotePad(argv.user);
      aux.readNote(argv.title);
    }
  },
});


/**
 * Comando con yards para eliminar una nota especifica
 */
yargs.command({
  command: 'remove',
  describe: 'Removes a note of the user',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      const aux = new NotePad(argv.user);
      aux.removeNote(argv.title);
    }
  },
});

yargs.parse();