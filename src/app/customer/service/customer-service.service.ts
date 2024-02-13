import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Category } from './interfaces/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductView } from './interfaces/productView';

const URL = 'http://localhost:8085/';
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient,private snackBar: MatSnackBar) { 
     
  }
  categoriesMemory: Category[] = [
    {id:1, name:'Headphones',imgUrl:'https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png',countProducts:10},
    {id:2, name:'Smartphones',imgUrl:'https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png',countProducts:10},
    {id:3, name:'Laptops',imgUrl:'https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png',countProducts:10},
    {id:4, name:'Cameras',imgUrl:'https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png',countProducts:10},
    {id:5, name:'Tablets',imgUrl:'https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png',countProducts:10},
    {id:6, name:'Smartwatches',imgUrl:'https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png',countProducts:10},
    {id:7, name:'Video Games',imgUrl:'https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png',countProducts:10},
    {id:8, name:'Televisions',imgUrl:'https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png',countProducts:10},
    {id:9, name:'Headphones',imgUrl:'https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png',countProducts:10},
  ];
  productsMemory: ProductView[] = [
    {
      id:1,
      imgUrl:"https://falabella.scene7.com/is/image/FalabellaPE/gsc_126057328_4428569_1?wid=1500&hei=1500&qlt=70",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:2,
      imgUrl:"https://s7d2.scene7.com/is/image/TottusPE/43216611_1?wid=1500&hei=1500&qlt=70",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:3,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:4,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:5,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:6,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:7,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:8,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:9,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:10,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:11,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
    },
    {
      id:12,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Smartphones",
      name:"ONTEC E Headset",
      price: 200,
    }
  ];

  public getCategoriesList(): Observable<Category[]> {
    return this.http.get<Category[]>(URL + 'api/customer/categories');
  }

  loadCategoriesStandardMethod(): Observable<Category[]>{
    return this.getCategoriesList().pipe(
      map((res:any) => {
        console.log(res);
        return res.corps.data as Category[];
      }),
      catchError(err => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
        }else{
          const corps = err.error.corps;
          this.printErrorToGetAllOrFindResource(corps);
        }
        return throwError(err);
      })
    )
  }

  public getSimpleCategoriesList(): Observable<Category[]> {
    return this.http.get<Category[]>(URL + 'api/customer/simple/categories');
  }

  loadSimpleCategoriesStandardMethod(): Observable<Category[]>{
    return this.getSimpleCategoriesList().pipe(
      map((res:any) => {
        console.log(res);
        return res.corps.data as Category[];
      }),
      catchError(err => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
        }else{
          const corps = err.error.corps;
          this.printErrorToGetAllOrFindResource(corps);
        }
        return throwError(err);
      })
    )
  }




  public getFirstProductsList(limit:number): Observable<Category[]> {
    return this.http.get<ProductView[]>(URL + 'api/customer/products/first/'+limit);
  }

  loadFirstProductsByDateStandardMethod(limit:number): Observable<ProductView[]>{
    return this.getFirstProductsList(limit).pipe(
      map((res:any) => {
        console.log(res);
        return res.corps.data as ProductView[];
      }),
      catchError(err => {
        console.log(err);
        if(err.status==0){
          this.snackBar.open('Server not working...', 'Close', {
            duration: 7000,
          });
        }else{
          const corps = err.error.corps;
          this.printErrorToGetAllOrFindResource(corps);
        }
        return throwError(err);
      })
    )
  }
  

  printErrorToGetAllOrFindResource(corps:any){
      if(corps){
        switch(corps.type){
          case 'DATA_EMPTY':
            this.snackBar.open(corps.message, 'Close', {
              duration: 7000,
            });
            break;
          default:
            this.snackBar.open('Error getting categories', 'Close', {
              duration: 7000,
            });
        }
      }
    }


  

  
}
