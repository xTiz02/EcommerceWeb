import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { ICarouselItem } from '../../../service/carousel/carousel-item';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [ MatIconModule, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() items: ICarouselItem[] = [];

  public finalHeight: string | number = 0;
  public currentPosition = 0;

  constructor() {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
  }

  ngOnInit() {
    this.items = [
      {
        id: 1,
        title:{
          firts: 'Welcome !     ',
          second: ':)',
        },
        subtitle: 'Made with angular/spring boot',
        link: '/',
        image: 'https://img.freepik.com/free-vector/free-vector-super-sale-banner-template-design_354956-890.jpg?size=626&ext=jpg&ga=GA1.2.787776219.1707627172&semt=ais'
      },
      {
        id: 2,
        title:{
          firts: 'Slide 2',
          second: 'Slide 2'
        },
        subtitle: 'Slide 2 description',
        link: '/',
        image: 'https://img.freepik.com/free-psd/special-offer-black-friday-web-banner-template_120329-1093.jpg?size=626&ext=jpg&ga=GA1.2.787776219.1707627172&semt=ais'
      }
    ];
    
   this.items.map((i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }
  setCurrentPosition(position: number) {
    this.currentPosition = position;
    this.items.find(i => i.id === 0)!.marginLeft = -100 * position;
  }

  setNext() {
    let finalPorcentage = 0;
    let nextPosition = this.currentPosition + 1;
    if(nextPosition <= this.items.length-1) {
      finalPorcentage = -100 * nextPosition;
    }else{
      nextPosition = 0;
    }
    this.items.find(i => i.id === 0)!.marginLeft = finalPorcentage;
    this.currentPosition = nextPosition;
  }

  setBack() {
    let finalPorcentage = 0;
    let backPosition = this.currentPosition - 1;
    if(backPosition >= 0) {
      finalPorcentage = -100 * backPosition;
    }else{
      backPosition = this.items.length-1;
      finalPorcentage = -100 * backPosition;
    }
    this.items.find(i => i.id === 0)!.marginLeft = finalPorcentage;
    this.currentPosition = backPosition;
  }
}
