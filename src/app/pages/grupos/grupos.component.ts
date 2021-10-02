import { Component, OnInit } from '@angular/core';
import { ApiInfoService } from '../../services/api-info.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupos = []

  constructor(private apiInfoService:ApiInfoService) { }

  ngOnInit() {

    this.apiInfoService.getGrupos().subscribe(res =>{
      console.log(res);
      this.grupos = res
    })
  }

}
