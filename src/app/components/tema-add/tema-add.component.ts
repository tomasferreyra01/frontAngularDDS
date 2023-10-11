import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/models/material.model'
import { MaterialService } from 'src/app/services/material.service';
import {TemaService} from 'src/app/services/tema.service';
import { Tema } from 'src/app/models/tema.model';


@Component({
  selector: 'app-tema-add',
  templateUrl: './tema-add.component.html',
  styleUrls: ['./tema-add.component.css']
})
export class TemaAddComponent implements OnInit {
	tema: Tema={
	id: 0,
	nombre: '',
	duracion: 0
	};
	
	submitted = false;
	temasCursos: any[] = [];
	materiales?: Material[];
	temas?:Tema[];
	

  constructor(private materialService: MaterialService,
  private temaService: TemaService) { }

  ngOnInit(): void {
  }

}
