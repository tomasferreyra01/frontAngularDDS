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
    id: 0,
   }
  };
  
  submitted = false;
  temasCursos: any[] = [];
  materiales?: Material[];
  temas?:Tema[];
  selectedMaterialId : number = 0;
  dateError: boolean = false;
  nameError: boolean = false;
  temaError: boolean = false;

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
    const data = {
		"id": this.curso.id,
    	"nombre": this.curso.nombre,
    	"fechaInicio": this.curso.fechaInicio,
    	"idDocente": this.curso.idDocente,
    	"tema": { id: this.selectedTemaId }
    	};
    this.cursoService.create(data)
      .subscribe({
        next: (res) => {	
          console.log(res);
          this.submitted = true;
        },
        error: (e) =>
        {
        	console.error(e);
		} 
      });
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
          console.log("Materiales:", this.materialesTema); },
        error: (e) => console.error("Materiales error")});  };
        
  newCurso(): void {
    this.submitted = false;
    this.curso = {
	  nombre: '',
	  fechaInicio: new Date(),
	  idDocente: 1,
	  tema:{ id: this.selectedTemaId }
	};
  }
  
	 
}
