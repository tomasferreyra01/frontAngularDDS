import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import * as bootstrap from 'bootstrap';
import { Material } from 'src/app/models/material.model'
import { MaterialService } from 'src/app/services/material.service';
import {TemaService} from 'src/app/services/tema.service';
import { Tema } from 'src/app/models/tema.model';


@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css']
})
export class CursoDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentElement: Curso = <Curso>{
    title: '',
    status: 'draft',
    content: ''
  };
  
  curso: Curso = {
  nombre: '',
  fechaInicio: new Date(),
  idDocente: 1,
  tema: { 
    id: 0,
   }
  };

  message = '';
  showToastFlag: boolean = false;

  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,
    private temaService: TemaService) { }
    
   private previousTemaId: any;
   idTema = this.temaService.get(this.currentElement)
   selectedTemaId : number = 0;
   materialesTema?: Material[] = [];
   
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getElement(this.route.snapshot.params["id"]);
    }
  }
  
   retrieveMaterialesPorCurso(): void {
	this.materialService.obtenerMaterialesPorIdCurso(this.selectedTemaId)
      .subscribe({
        next: (data) => {
          this.materialesTema = data;
          console.log(this.materialesTema);
          console.log("Materiales:", this.materialesTema); },
        error: (e) => console.error("Materiales error")
      });  };
 
	  asignarTemaId(idTema : any) {
	 if (idTema !== this.previousTemaId) { 
	  this.selectedTemaId = idTema 
	  this.retrieveMaterialesPorCurso()
	  this.previousTemaId = idTema;
	  }
	 }
 
  getElement(id: string): void {
    this.cursoService.get(id)
      .subscribe({
        next: (data) => {
          this.currentElement = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateElement(): void {
    this.message = '';
    const data = {
    id: this.currentElement.id, 
    nombre: this.currentElement.nombre, 
    fechaInicio: this.curso.fechaInicio,
    tema:{id:1},
    idDocente:1,
  };

  this.cursoService.update(data.id, data)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'Curso actualizado!';
      },
      error: (e) => console.error(e)
    });
  }

  deleteElement(): void {
    this.cursoService.delete(this.currentElement.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cursos']);
        },
        error: (e) => console.error(e)
      });
  }

  
}
