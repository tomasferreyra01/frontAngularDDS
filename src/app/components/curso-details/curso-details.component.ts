import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { Tema } from 'src/app/models/tema.model';
import * as bootstrap from 'bootstrap';
import { Material } from 'src/app/models/material.model'
import { MaterialService } from 'src/app/services/material.service';

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
  temasCursos: any[] = [];
  materiales?: Material[];

  message = '';
  showToastFlag: boolean = false;

  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,) { }

  ngOnInit(): void {
	this.retrieveMateriales()
    if (!this.viewMode) {
      this.message = '';
      this.getElement(this.route.snapshot.params["id"]);
    }
    this.cursoService.getTemasDeCurso().subscribe(
  temas => {
    this.temasCursos = temas;
  },
  error => {
    console.error('Error al obtener temas de cursos:', error);
  }
);
  }
  
  retrieveMateriales(): void {
	this.materialService.getAll()
      .subscribe({
        next: (data) => {
          this.materiales = data;
          console.log(this.materiales); },
        error: (e) => console.error(e)
      });
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
    this.cursoService.update(this.currentElement.id, this.currentElement)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.showToast(); // Mostrar el toast
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

  showToast() {
    this.showToastFlag = true;
    setTimeout(() => this.hideToast(), 8000); // Ocultar el toast después de 8 segundos
  }

  hideToast() {
    this.showToastFlag = false;
  }
}
