import { Component, OnInit } from '@angular/core';
import {TemaService} from 'src/app/services/tema.service';
import { Tema } from 'src/app/models/tema.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tema-add',
  templateUrl: './tema-add.component.html',
  styleUrls: ['./tema-add.component.css']
})
export class TemaAddComponent implements OnInit {
	tema: Tema={
	id: null,
	nombre: '',
	duracion: null
	};
	
	submitted = false;
	temas?:Tema[];
	

  constructor(private temaService: TemaService) { }

  ngOnInit(): void {
	this.retrieveTema()	
  }
  
  saveTema(): void {
    const data = {
		"id": this.tema.id,
    	"nombre": this.tema.nombre,
    	"duracion": this.tema.duracion,
    	};
    this.temaService.create(data)
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
    
  retrieveTema(): void {
 	this.temaService.getAll()
      .subscribe({
        next: (data) => {
          this.temas = data;
          console.log(this.temas);},
        error: (e) => console.error(e)});
  }	


  newTema(): void {
    this.submitted = false;
    this.tema = {};
  }
  
  isFormValid() {
    return this.tema.nombre && this.tema.duracion && this.tema.id;
  }
 
}
