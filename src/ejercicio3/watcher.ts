const fs = require('fs');
const chalk = require('chalk');

const error = chalk.red;
const good = chalk.green;

export class Watcher {
  constructor(private name: string, private rute: string) {
    this.watchNote();
  }

  watchNote () {
    let check = this.checkDir(this.name, this.rute);
    if (check == false) {
      console.log(error(`\nEl directorio del usuario ${this.name} no existe`));
      return -1;
    } 
    else {
      console.log(good(`\nEsperando por cambios...\n`));
      const watcher = fs.watch(`${this.rute}/${this.name}`);
      let event: boolean = false;
      watcher.on('change', (eventType, filename) => {
        switch (eventType) {
          case 'rename':
            check = this.checkDir(filename, `${this.rute}/${this.name}`);
            if (check) {
              console.log(`La nota ${filename} ha sido creada`);
            } else {
              console.log(`La nota ${filename} ha sido eliminada`);
            }
            break;
          case 'change':
            console.log(`La nota ${filename} ha sido modificada`);
            break;  
        }
        console.log(good(`\nEsperando por cambios...\n`));
      });
      return;
    }
  }

  checkDir (name: string, rute: string): boolean {
    try {
      fs.accessSync(`${rute}/${name}`, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }
}