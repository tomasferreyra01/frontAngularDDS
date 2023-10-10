import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { Material } from 'src/app/models/material.model'
import { MaterialService } from 'src/app/services/material.service';
import {TemaService} from 'src/app/services/tema.service';
import { Tema } from 'src/app/models/tema.model';

@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent implements OnInit {
  curso: Curso = {
  nombre: '',
  fechaInicio: new Date(),
  idDocente: 1,
  tema: { 
    id: 0 // Aquí estamos estableciendo el id del tema dentro de un objeto
   }
  };
  submitted = false;
  temasCursos: any[] = [];
  materiales?: Material[];
  temas?:Tema[];
  selectedMaterialId : number = 0;
  dateError: boolean = false;

  constructor(private cursoService: CursoService, 
  private materialService: MaterialService,
  private temaService: TemaService) {}

  selectedTemaId : number = 0;
  materialesTema?: Material[] = [];
  materialesFiltrados? : Material[] = [];
  
  ngOnInit(): void {
	this.retrieveMateriales()
	this.retrieveTema()
	this.retrieveMaterialesPorCurso()	
    // Suponiendo que tienes una variable para almacenar el id del curso seleccionado
    const idCursoSeleccionado = 1; // Debes obtener este valor según la lógica de tu aplicación

    this.cursoService.getTemasDeCurso().subscribe(
  temas => {
    this.temasCursos = temas;
  },
  error => {
    console.error('Error al obtener temas de cursos:', error);
  }
);


  }
  saveCurso(): void {
    this.cursoService.create(this.curso).subscribe(
      response => {
        console.log('Curso creado exitosamente:', response);
        this.submitted = true;
      },
      error => {
        console.error('Error al crear el curso:', error);
      }
    );
  }
  //CARGO LA LISTA DE MATERIALES
  retrieveMateriales(): void {
	this.materialService.getAll()
      .subscribe({
        next: (data) => {
          this.materiales = data;
          console.log(this.materiales); },
        error: (e) => console.error(e)
      });
     }
     
  retrieveTema(): void {
 	this.temaService.getAll()
      .subscribe({
        next: (data) => {
          this.temas = data;
          console.log(this.temas);},
        error: (e) => console.error(e)});
  }	

  retrieveMaterialesPorCurso(): void {
	this.materialService.obtenerMaterialesPorIdCurso(this.selectedTemaId)
      .subscribe({
        next: (data) => {
          this.materialesTema = data;
          console.log(this.materialesTema);
          console.log("Materiales recuperados:", this.materialesTema); },
        error: (e) => console.error("Materiales no recuperados")});  };
        
  newCurso(): void {
    this.submitted = false;
    this.curso = {
	  nombre: '',
	  fechaInicio: new Date(),
	  idDocente: 1, //campo obligatorio
	  tema: {
	    id: 0 // Aquí estamos estableciendo el id del tema dentro de un objeto
	  }
	};
  }
  
	 
}
