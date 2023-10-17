import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/models/alumno.model';

@Component({
  selector: 'app-alumnos-add',
  templateUrl: './alumnos-add.component.html',
  styleUrls: ['./alumnos-add.component.css']
})
export class AlumnosAddComponent implements OnInit {
	alumno: Alumno={
		id: null,
		nombre: '',
		fechaNacimiento: new Date,
	}
  alumnos?: Alumno[];
  submitted = false;
  
  constructor(private alumnoService: AlumnoService,) {}


  ngOnInit(): void {
    this.retrieveAlumnos();

  }

  saveAlumno(): void {
    const data = {
	  "id": this.alumno.id,
      "nombre": this.alumno.nombre,
      "fechaNacimiento": this.alumno.fechaNacimiento
    };
    this.alumnoService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  newAlumno(): void {
    this.submitted = false;
    this.alumno = {};
  }

  retrieveAlumnos(): void {
    this.alumnoService.getAll()
      .subscribe({
        next: (data) => {
          this.alumnos = data;
          console.log(this.alumnos);
        },
        error: (e) => console.error(e)
      });
  }
  
  isFormValid() {
    return this.alumno.nombre && this.alumno.id && this.alumno.fechaNacimiento;
  }
}
