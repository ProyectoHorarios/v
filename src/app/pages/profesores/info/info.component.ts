import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  name: any;
  constructor( private _mdr: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) data: string) {
    //this.name = data.name;
  }
  CloseDialog() {
    this._mdr.close(false)
  }

  ngOnInit(): void {
  }

}
