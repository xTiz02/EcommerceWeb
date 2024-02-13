
import { Router, RouterModule,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { StorageService } from '../service/storage/storage.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';



interface RutasObject {
  title: any;
  path: string;
  active: string;
}


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [  RouterModule ,CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule ,MatSidenavModule ,MatIconModule ,MatMenuModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements AfterViewInit{
  title = 'EcommerceWeb3';
  @ViewChild(MatSidenav)
  sidenav! : MatSidenav;
  screenSize1: boolean = true;
  screenSize2: boolean = true;
  screenSize3: boolean = true;
  constructor(private observer : BreakpointObserver, private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.detectScreenSize();
  }

  ngOnInit() {
    this.detectScreenSize();
  }

  detectScreenSize() {
    if (window.innerWidth < 670) {
      this.screenSize1 = true;
      this.screenSize2 = false;
      this.screenSize3 = false;
    } else if (window.innerWidth < 1050) {
      this.screenSize1 = true;
      this.screenSize2 = true;
      this.screenSize3 = false;
    } else {
      this.screenSize1 = true;
      this.screenSize2 = true;
      this.screenSize3 = true;
    }
    
  }
  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode ='over';
        this.sidenav.close()
      }
      else{
        this.sidenav.mode = 'over';
        this.sidenav.close()
      }
    })
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
  logout(): void{
    StorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
