import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [ MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss'
})
export class DialogContentComponent {
  //obtener id del producto
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
  }
  //obtener id del producto del openDialog del componente padre
  idProduct?: number;
  ngOnInit(): void {
    this.idProduct = this.data.id;
  }
}
