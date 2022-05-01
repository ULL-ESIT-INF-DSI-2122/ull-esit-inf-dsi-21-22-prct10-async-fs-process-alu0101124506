import * as fs from 'fs';
import * as chalk from 'chalk';
import yargs = require('yargs');
import { spawn } from 'child_process';

const error = chalk.red;
const good = chalk.green;

 yargs.command( {
  command: 'analyze',
  describe: 'Nos da el numero de lineas, palabras o carectares que tiene un fichero',
  builder: {
    pipe: {
      describe: 'Utilizacion de pipes',
      demandOption: true,
      type: 'string',
    },
    fichero: {
      describe: 'Nombre del fichero',
      demandOption: true,
      type: 'string',
    },
    lineas: {
      describe: 'Activar el numero de lineas',
      demandOption: false,
      type: 'boolean',
    },
    palabras: {
      describe: 'Activar el numero de palabras',
      demandOption: false,
      type: 'boolean',
    },
    caracteres: {
      describe: 'Activar el numero de caracteres',
      demandOption: false,
      type: 'boolean',
    },
  },
  handler(argv) {
    if ((typeof argv.pipe === "string") && (typeof argv.fichero === "string")) {

      let comando: string[] = [];

      if (argv.pipe.toLocaleLowerCase() == "si")
        conPipe(comando, argv.fichero);
      else if (argv.pipe.toLocaleLowerCase() == "no")
        sinPipe(comando, argv.fichero);
      else
        console.log(error("\nHa introducido mal el parámetro pipe. Por favor, introduzca 'si' o 'no'\n"));

      if (argv.lineas == true)
        comando.push("lineas");
      if (argv.palabras == true)
        comando.push("palabras");
      if (argv.caracteres == true)
        comando.push("caracteres");
      if (comando.length == 0)
        console.log(error("\nNo ha introducido ninguna opción a analizar. Por favor elija al menos una\n"));
    }
  },
}).parse();


function conPipe(entrada: string[], nombreFichero: string) {
  fs.access(nombreFichero, (err) => {
    if (err)
      console.log(error("\nEl fichero introducido no existe\n"));
    else {
      let echo = spawn('echo', [`\nAbriendo el fichero: ${nombreFichero}\n`]);
      let wc = spawn('wc', [`${nombreFichero}`]);
      echo.stdout.pipe(process.stdout);
      let wcOutput  = '';
      wc.stdout.on('data', (piece) => wcOutput  += piece);

      wc.on('close', () => {
        let outputArray = wcOutput .split(/\s+/);
        entrada.forEach((element) => {
          if (element == "lineas") {
            const echo = spawn('echo', [`El fichero '${nombreFichero}', contiene ${parseInt(outputArray[1])+1} líneas.\n`]);
            echo.stdout.pipe(process.stdout);
          }
          if (element == "palabras") {
            const echo = spawn('echo', [`El fichero '${nombreFichero}', contiene ${outputArray[2]} palabras.\n`]);
            echo.stdout.pipe(process.stdout);
          }
          if (element == "caracteres") {
            const echo = spawn('echo', [`El fichero '${nombreFichero}', contiene ${outputArray[3]} caracteres.\n`]);
            echo.stdout.pipe(process.stdout);
          }
        });
      });
    }
  });
}


function sinPipe(entrada: string[], nombreFichero: string) {
  fs.access(nombreFichero, (err) => {
    if (err)
      console.log(error("\nEl fichero que ha introducido no existe.\n"));
    else {
      let wc = spawn('wc', [`${nombreFichero}`]);
      console.log(`\n${nombreFichero}\n`);
      let wcOutput  = '';
      wc.stdout.on('data', (piece) => wcOutput  += piece);

      wc.on('close', () => {
        const outputArray = wcOutput .split(/\s+/);
        entrada.forEach((element) => {
          if (element == "lineas")
            console.log(`El fichero '${nombreFichero}', contiene ${parseInt(outputArray[1])+1} líneas.\n`);
          if (element == "palabras")
            console.log(`El fichero '${nombreFichero}', contiene ${outputArray[2]} palabras.\n`);
          if (element == "caracteres")
            console.log(`El fichero '${nombreFichero}', contiene ${outputArray[3]} caracteres.\n`);
        });
      });
    }
  });
}