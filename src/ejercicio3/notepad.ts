import {Note} from './note';
import {readFile, writeFile, existsSync, readdirSync} from 'fs';
import {spawn} from 'child_process';

const chalk = require('chalk');

const error = chalk.red;
const good = chalk.green;


/**
 * Clase la cual contiene todas las notas creadas
 */
export class NotePad {
  constructor(private username: string) {
  }


  /**
   * Funcion que busca una nota por su titulo
   * @param title le pasamos el titulo de la nota que queremos encontrar
   * @returns retorna true si se encontro la nota o false en el caso contrario
   */
  findNote(title: string): boolean {
    if (existsSync(`./${this.username}/${title}.json`)) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Funcion que añade una nota
   * @param newNote le pasamos la nota que queremos añadir
   */
  addNote(newNote: Note) {
    if (this.findNote(newNote.getTitle())) {
      console.log(error('Existe una nota con el mismo titulo'));
    } else {
      writeFile(`./${this.username}/${newNote.getTitle()}.json`,
          `{\n${newNote.getNote()}\n}`, (err) => {
            if (err) {
              console.log(error('No se pudo crear la nota'));
            } else {
              console.log(good('Se ha añadido la nota'));
            }
          });
    }
  }


  /**
   * Funcion que modifica la nota deseada
   * @param title le pasamos el titulo de la nota para buscarla
   * @param newText este sera el nuevo contenido de la nota
   * @param color el color de la nota
   */
  modifyNote(title: string, newText: string, color: string) {
    if (this.findNote(title)) {
      writeFile(`./${this.username}/${title}.json`,
          `{\ntitle: ${title}\ntext: ${newText}\ncolor: ` +
          `${color}\n}`, (err) => {
            if (err) {
              console.log(error('No se pudo modificar la nota.'));
            } else {
              console.log(good('Se ha modificado la nota'));
            }
          });
    } else {
      console.log(error('No existe una nota con el mismo titulo'));
    }
  }


  /**
   * Funcion que elimina una nota
   * @param title le pasamos el titulo de la nota que deseamos eliminar
   */
  removeNote(title: string) {
    if (this.findNote(title)) {
      spawn('rm', [`./${this.username}/${title}.json`]);
      console.log(good('Se ha eliminado la nota'));
    } else {
      console.log(error('No existe una nota con el mismo titulo'));
    }
  }


  /**
   * Funcion que nos muestra por pantalla una lista con todos los titulos de las notas
   */
  listTitle(): void {
    if (existsSync(`./${this.username}`)) {
      const files = readdirSync(`./${this.username}`);
      files.forEach((file) => {
        readFile(`./${this.username}/${file}`, (err, data) => {
          if (err) {
            console.log(error('No se pudo leer el fichero'));
          } else {
            const d = JSON.parse(data.toString());
            switch (d.color) {
              case 'red':
                console.log(chalk.red(d.title));
                break;
              case 'green':
                console.log(chalk.green(d.title));
                break;
              case 'blue':
                console.log(chalk.blue(d.title));
                break;
              case 'yellow':
                console.log(chalk.yellow(d.title));
                break;
              default:
                console.log(d.title);
            }
          }
        });
      });
    }
  }


  /**
   * Funcion para poder leer el contenido de una nota
   * @param title titulo de la nota la cual queremos leer el contenido
   */
  readNote(title: string) {
    if (this.findNote(title)) {
      readFile(`./${this.username}/${title}.json`, (err, data) => {
        if (err) {
          console.log(error('No se pudo leer el fichero'));
        } else {
          const d = JSON.parse(data.toString());
          switch (d.color) {
            case 'red':
              console.log(chalk.red(`\n${d.title}\n${d.text}\n`));
              break;
            case 'green':
              console.log(chalk.green(`\n${d.title}\n${d.text}\n`));
              break;
            case 'blue':
              console.log(chalk.blue(`\n${d.title}\n${d.text}\n`));
              break;
            case 'yellow':
              console.log(chalk.yellow(`\n${d.title}\n${d.text}\n`));
              break;
            default:
              console.log(`\n${d.title}\n${d.text}\n`);
          }
        }
      });
    } else {
      console.log(error('No existe una nota con el mismo titulo'));
    }
  }


  /**
   * Funcion que nos devuelve el usuario de la nota
   * @returns retorna el nombre de usuario
   */
  getUsername(): string {
    return this.username;
  }
}