import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/ejercicio3/note';


const newNote = new Note("Test Note", "Nota de pruebas en rojo", "red");

describe('Tests de la clase Note', ()=>{
  it('Comprobando funcion de clase: getNote ', ()=> {
    expect(newNote.getNote()).to.be.eql(`"title": "Test Note",\n"text": "Nota de pruebas en rojo",\n"color": "red"`);
  });

  it('Comprobando funcion de clase: getTitle ', ()=> {
    expect(newNote.getTitle()).to.be.eql("Test Note");
  });

  it('Comprobando funcion de clase: getColor ', ()=> {
    expect(newNote.getColor()).to.be.eql("red");
  });

  it('Comprobando funcion de clase: modify ', ()=> {
    newNote.modify("Nota modificada");
    expect(newNote.getNote()).to.be.eql(`"title": "Test Note",\n"text": "Nota modificada",\n"color": "red"`);
  });
});