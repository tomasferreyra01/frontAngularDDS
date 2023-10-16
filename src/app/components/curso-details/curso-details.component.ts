import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { Material } from 'src/app/models/material.model'
import { MaterialService } from 'src/app/services/material.service';
import { TemaService } from 'src/app/services/tema.service';
import { Tema } from 'src/app/models/tema.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


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
  
  message = '';
  cursoForm: FormGroup;
  minDate = new Date();
  updateSuccessMessageVisible = false
 //CONTRUCTORES
 
  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,
    private temaService: TemaService,
    private formBuilder: FormBuilder) {
		
	  this.cursoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      tema: [null, Validators.required],
      fechaInicio: [null, [Validators.required]],
      idDocente: [1, Validators.required],
    }); 
	 } 
   
   submitted: boolean = false;
   dateError : boolean = false;
   // CARGA INIT
   
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getElement(this.route.snapshot.params["id"]);
      if (this.currentElement.tema) {
      this.asignarTemaId(this.currentElement.tema.id);
    }
    }
  }
  
  //FUNCIONES
  materialesTema?: Material[] = [];
  
  idTema = this.temaService.get(this.currentElement)
  
  selectedTemaId : number = 0;
  
  
   retrieveMaterialesPorCurso(): void {
	 if (this.selectedTemaId) {
      this.materialService.obtenerMaterialesPorIdCurso(this.selectedTemaId)
        .subscribe({
          next: (data) => {
            this.materialesTema = data;
            console.log('Materiales:', this.materialesTema);
          },
          error: (e) => console.error('Materiales error', e)
        });
    } else {
      this.materialesTema = [];  // Si no hay tema seleccionado, vacía la lista de materiales
    }
  }
 
 	private previousTemaId: any;
 	
	
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
	this.cursoService.update(this.currentElement.id, this.currentElement)
	    .subscribe({
        next: (res) => {
          console.log(res);
        
          this.showSuccessMessage();
          setTimeout(() => {
          this.router.navigate(['/cursos']);}, 2000);},
        error: (e) => console.error(e)
      });
     }    
     
   showSuccessMessage(): void {
  this.updateSuccessMessageVisible = true;
  
	setTimeout(() => {
	    this.updateSuccessMessageVisible = false;
	  }, 3000);
	}

	cancelUpdate(): void {
	  this.router.navigate(['/cursos']);
	}

  deleteElement(): void {
    this.cursoService.delete(this.currentElement.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Curso eliminado!';
          setTimeout(() => {
          this.router.navigate(['/cursos']);}, 2000);},
        error: (e) => console.error(e)
      });
     }
  
  selectCourse(course: Curso) {
  this.currentElement = course;
  this.viewMode = true; 
} 

 
}
