# Práctica 10 Sistema de ficheros y creación de procesos en Node.js

## Objetivos

Esta practica tiene como objetivo familializarse con la API asíncrona y la de callbacks que proporciona Node.js, además de trabajar con los paquetes yargs y chalk que nos ayudarán a interactuar mediante línea de comandos con nuestra herramienta.

## Ejercicios

### Ejercicio 1

Aqui se nos pide realizar una traza del comportamiento del siguiente codigo:


````
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
````

**Paso 1:** Inicializamos las 4 colas a vacías

* Pila de llamadas: --
* Registro de eventos: --
* Cola de manejadores: --
* Console: --

**Paso 2:** La función `main()` entra a la pila de llamadas

* Pila de llamadas: `main()`
* Registro de eventos: --
* Cola de manejadores: --
* Console: --

Ahora, pueden ocurrir dos cosas dependiendo de si se cumple o no que `process.argv.lenght` sea distinto de 3.
Para que se cumpla esto, creamos un archivo que llamaremos `ejercicio1.txt`, y se lo pasamos a la hora de ejecutar el programa.
Para que se cumple el `if` primero ejecutamos el programa si pasarle nada, por lo que pasa lo siguiente:

**Paso 3:** Introducimos `console.log('Please, specify a file')` a la pila de llamadas

* Pila de llamadas: `main()`, `console.log('Please, specify a file')`
* Registro de eventos: --
* Cola de manejadores: --
* Console: --

**Paso 4:** Sacamos `console.log('Please, specify a file')` de la pila de llamadas y se imprime por pantalla su mensaje:

* Pila de llamadas: `main()`
* Registro de eventos: --
* Cola de manejadores: --
* Console: `console.log('Please, specify a file')`

**Paso 5:** Sale `main()` de la pila de llamadas y se acaba el programa

* Pila de llamadas: --
* Registro de eventos: --
* Cola de manejadores: --
* Console: `console.log('Please, specify a file')`


Ahora queremos que pase por el `else` por lo que le pasamos el archivo `ejercicio1.txt` al programa cuando ejecutamos el mismo, y por lo tanto pasa lo siguiente:

**Paso 3:** Introducimos `access()` a la pila de llamadas:

* Pila de llamadas: `main()`, `access()`
* Registro de eventos: --
* Cola de manejadores: --
* Console: --

**Paso 4:** `access()` sale de la pila de llamadas y entra en el registro de eventos de la API:

* Pila de llamadas: `main()`
* Registro de eventos: `access()`
* Cola de manejadores: --
* Console: --

**Paso 5:** La función `main()` sale de la pila de llamadas. Justo después de esto, `access()` sale de la API y entra en la cola de manejadores

* Pila de llamadas: --
* Registro de eventos: --
* Cola de manejadores: `access()`
* Console: --

**Paso 6:** Al estar vacía la pila de llamadas, `access()` entra a esta

* Pila de llamadas: `anonymous(access())`
* Registro de eventos: --
* Cola de manejadores: --
* Console: --

**Paso 7:** Se ejecuta `access()` y entra a la pila de llamadas `console.log(Starting to watch file ${filename})`

* Pila de llamadas: `anonymous(access())`, `console.log(Starting to watch file ${filename})`
* Registro de eventos: --
* Cola de manejadores: --
* Console: --

**Paso 8:** Se ejecuta `console.log(Starting to watch file ${filename})`, sale de la pila de llamadas y se muestra por consola su mensaje

* Pila de llamadas: `anonymous(access())`
* Registro de eventos: --
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`

**Paso 9:** La función `watch(process.argv[2])` entra a la pila de llamadas

* Pila de llamadas: `anonymous(access())`, `watch(process.argv[2])`
* Registro de eventos: --
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`

**Paso 10:** La función `watch(process.argv[2])` se ejecuta y como no es un forEach(), sale de la pila de llamadas

* Pila de llamadas: `anonymous(access())`
* Registro de eventos: --
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`

**Paso 11:** La función `watcher.on()` entra en la pila de llamadas

* Pila de llamadas: `anonymous(access())`, `watcher.on()`
* Registro de eventos: --
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`

**Paso 12:** La función `watcher.on()` sale de la pila de llamadas y entra al registro de eventos de la API

* Pila de llamadas: `anonymous(access())`
* Registro de eventos: `watcher.on()`
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`

**Paso 13:** La función `watcher.on()` esperará a que se produzca algún cambio en ese fichero, así que ahora entra a la pila de llamadas `console.log(File ${filename} is no longer watched)`

* Pila de llamadas: `anonymous(access())`, `console.log(File ${filename} is no longer watched)`
* Registro de eventos: `watcher.on()`
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`

**Paso 14:** La función `console.log(File ${filename} is no longer watched)` se ejecuta, sale de la pila de llamadas y se muestra por consola su mensaje

* Pila de llamadas: `anonymous(access())`
* Registro de eventos: `watcher.on()`
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`, `console.log(File ${filename} is no longer watched)`

**Paso 15:** Como ya hemos recorrido todo el código, sale de la pila de llamadas `anonymous(access())` y el programa se quedará esperando a que editemos el fichero que le pasamos. Tras modificar el fichero por primera vez, la función `watcher.on()` que estaba a la espera, reconocerá la modificación mandando a la cola de manejadores lo siguiente: `console.log(File ${filename} has been modified somehow)`

* Pila de llamadas: --
* Registro de eventos: `watcher.on()`
* Cola de manejadores: `console.log(File ${filename} has been modified somehow)`
* Console: `console.log(Starting to watch file ${filename})`, `console.log(File ${filename} is no longer watched)`

**Paso 16:** Ahora el manejador detecta que tiene un `console.log()` y lo manda a la cola de llamadas

* Pila de llamadas: `console.log(File ${filename} has been modified somehow)`
* Registro de eventos: `watcher.on()`
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`, `console.log(File ${filename} is no longer watched)`

**Paso 17:** El `console.log(File ${filename} has been modified somehow)` se ejejuta y sale de la cola de llamadas, mostrandose este por consola

* Pila de llamadas: --
* Registro de eventos: `watcher.on()`
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`, `console.log(File ${filename} is no longer watched)`, `console.log(File ${filename} has been modified somehow)`

**Paso 18:** Editamos el fichero por segunda vez y ocurriría lo mismo que en el paso 15: 

* Pila de llamadas: --
* Registro de eventos: `watcher.on()`
* Cola de manejadores: `console.log(File ${filename} has been modified somehow)`
* Console: `console.log(Starting to watch file ${filename})`, `console.log(File ${filename} is no longer watched)`, `console.log(File ${filename} has been modified somehow)`

**Paso 19:** Ahora el manejador detecta que tiene un `console.log()` y lo manda a la cola de llamadas

* Pila de llamadas: `console.log(File ${filename} has been modified somehow)`
* Registro de eventos: `watcher.on()`
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`, `console.log(File ${filename} is no longer watched)`, `console.log(File ${filename} has been modified somehow)`

**Paso 20:** El `console.log(File ${filename} has been modified somehow)` se ejejuta y sale de la cola de llamadas, mostrandose este por consola 

* Pila de llamadas: --
* Registro de eventos: `watcher.on()`
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`, `console.log(File ${filename} is no longer watched)`, `console.log(File ${filename} has been modified somehow)`, `console.log(File ${filename} has been modified somehow)`

**Paso 21:** Tras haberlo editado dos veces, cerramos el programa y `watcher.on()` saldrá del registro de eventos de la API

* Pila de llamadas: --
* Registro de eventos: --
* Cola de manejadores: --
* Console: `console.log(Starting to watch file ${filename})`, `console.log(File ${filename} is no longer watched)`, `console.log(File ${filename} has been modified somehow)`, `console.log(File ${filename} has been modified somehow)`

Y asi nos quedaria la terminal al final:

![final](/img/1.png)



### Ejercicio 2

En este segundo ejercicio, lo primero que hice fue crear el comando `analyze`, el cual está diseñado para recibir hasta 5 parámetros por consola: `pipe`(Para activar o desactivar el método pipe, solo tienes que poner "si" para usarlo y "no" para no usarlo), `fichero`(El fichero que quieres analizar), `lineas`(El número de líneas que posee el fichero, se uttiliza poniendo `true`), `palabras`(El número de palabras que posee el fichero,  se uttiliza poniendo `true`) y `caracteres`(El número de caracteres que posee el fichero,  se uttiliza poniendo `true`). Las dos primeras opciones son obligatorias, mientras que las siguientes 3 son opcionales, puedes pedir solo las líneas, las palabras o los caracteres o cualquier combinacion de los anteriores, pero al menos una opcion hay que activar. 
Luego llegamos al manejador del comando, lo primero que hago es comprobar que el tipo de `pipe` y de `fichero` sea `string`. Después detecto si en `pipe` el usuario introdujo "si" o "no", en caso de no detectar una respuesta correcta devuelve un mensaje de error. Si detecta un "si" llama a la función `conPipe()` y en caso contrario a la función `sinPipe()`. 

````Typescript
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
        console.log("\nERROR: Ha introducido mal el parámetro pipe. Por favor, introduzca 'si' o 'no'\n");

      if (argv.lineas == true)
        comando.push("lineas");
      if (argv.palabras == true)
        comando.push("palabras");
      if (argv.caracteres == true)
        comando.push("caracteres");
      if (comando.length == 0)
        console.log("\nERROR: No ha introducido ninguna opción a analizar. Por favor elija al menos una\n");
    }
  },
}).parse();
````


Segidamente tenemos la funcion `conPipe()`, que se ejecuta solo si el usuario introdujo un sí en el parámetro `pipe`. 


````Typescript
function conPipe(entrada: string[], nombreFichero: string) {
  fs.access(nombreFichero, (err) => {
    if (err)
      console.log("\nERROR: El fichero introducido no existe\n");
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
````

A continuación, pasamos a la función `sinPipe()`, la cual hace exactamente lo mismo que el método anterior pero sin hacer uso del método `pipe` de un `Stream`. Al principio hago lo mismo solo que a la hora de mostrarlo no hago uso de `spawn('echo')` si no de simplemente `console.log()`.

````Typescript
function sinPipe(entrada: string[], nombreFichero: string) {
  fs.access(nombreFichero, (err) => {
    if (err)
      console.log("\nERROR: El fichero que ha introducido no existe.\n");
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
````

Ejemplo de funcionamiento:

![example](/img/2.png)