import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';

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
    id: 1 // Aquí estamos estableciendo el id del tema dentro de un objeto
   }
  };
  submitted = false;
  temasCursos: any[] = [];

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
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

  newCurso(): void {
    this.submitted = false;
    this.curso = {
	  nombre: '',
	  fechaInicio: new Date(),
	  idDocente: 1, //campo obligatorio
	  tema: {
	    id: 2 // Aquí estamos estableciendo el id del tema dentro de un objeto
	  }
	};
  }
}