
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
interface RutasObject {
  title: any;
  path: string;
  active: string;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EcommerceWeb3';

  constructor() {
  }
  
  //tipos de metodos en angular
  //ngonInit : se ejecuta cuando se crea el componente
  //ngonDestroy : se ejecuta cuando se destruye el componente
  //ngonChanges : se ejecuta cuando hay cambios en el componente
  //ngAfterViewInit : se ejecuta cuando se crea la vista del componente
  //ngAfterViewChecked : se ejecuta cuando se hace un cambio en la vista del componente
  //ngAfterContentInit : se ejecuta cuando se crea el contenido del componente
  //ngAfterContentChecked : se ejecuta cuando se hace un cambio en el contenido del componente
  //ngDoCheck : se ejecuta cuando se hace un cambio en el componente
  
}
