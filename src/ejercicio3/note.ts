const chalk = require('chalk')

const error = chalk.red;
const good = chalk.green;


/**
 * Clase Note, la cual describe lo que contiene una nota
 */
export class Note {

  constructor(private title: string, private text: string,
    private color: string) {}

  
  /**
   * Clase que imprime una nota dependiendo del color de la misma
   */
  print(): void {
    switch (this.color) {
      case 'red':
        console.log(chalk.red(this.title));
        console.log(chalk.red(this.text));
        break;
      case 'green':
        console.log(chalk.green(this.title));
        console.log(chalk.green(this.text));
        break;
      case 'blue':
        console.log(chalk.blue(this.title));
        console.log(chalk.blue(this.text));
        break;
      case 'yellow':
        console.log(chalk.yellow(this.title));
        console.log(chalk.yellow(this.text));
        break;
      default:
        console.log(error('No se pudo imprimir la nota'));
    }
  }


  /**
   * Funcion para conseguir una nota
   * @returns devuelve la nota deseada
   */
  getNote(): string {
    return `"title": "${this.title}",\n"text": "${this.text}",\n"color": "${this.color}"`;
  }


  /**
   * Funcion para modificar el contenido de la nota
   * @param newNote nuevo contenido de la nota
   */
  modify(newNote: string): void {
    this.text = newNote;
  }


  /**
   * Funcion para conseguir el titulo de la nota
   * @returns retorna el titulo de la nota deseada
   */
  getTitle() : string {
      return this.title;
  }


  /**
   * Funcion para saber el color de la nota
   * @returns retorna el color de la nota deseada
   */
  getColor() : string {
      return this.color;
  }
}