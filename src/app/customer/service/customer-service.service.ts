import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Category } from './interfaces/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductView } from './interfaces/productView';
import { Filter } from '../components/sub-components/product-page/product-page.component';
import { CartItem } from './interfaces/cartItem';

const URL = 'http://localhost:8085/';
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  CartStorageService: any;

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
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:2,
      imgUrl:"https://s7d2.scene7.com/is/image/TottusPE/43216611_1?wid=1500&hei=1500&qlt=70",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:3,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:4,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:5,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:6,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:7,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:8,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:9,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:10,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:11,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Headphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    },
    {
      id:12,
      imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
      categoryName:"Smartphones",
      name:"ONTEC E Headset",
      price: 200,
      units:[
        {
          id:1,
          color:"Black",
          priceModifier:0,
          stock:10,
          images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
        }
      ]
    }
  ];

  productMemory: ProductView = {
    id:1,
    imgUrl:"https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png",
    categoryName:"Headphones",
    name:"ONTEC E Headset",
    price: 200,
    discount: 10,
    stardDate: new Date(),
    endDate: new Date(),
    specifications: "Specifications",
    characteristics: "Characteristics",
    promotion:{
      id:1,
      discount:10,
      startDate:new Date(),
      endDate:new Date()
    },
    units:[{
      id:1,
      color:"Black",
      priceModifier:0,
      stock:10,
      images:["https://lazeapostolski.com/sophia-ecommerce/assets/images/product/small/headphone1/headphone1.png"]
    }]
  };

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


  public getProductWithDetails(id:number): Observable<ProductView> {
    return this.http.get<ProductView>(URL + 'api/customer/product/'+id);
  }


  loadProductWithDetailsStandardMethod(id:number): Observable<ProductView>{
    return this.getProductWithDetails(id).pipe(
      map((res:any) => {
        console.log(res);
        return res.corps.data as ProductView;
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

  public getPageProductsList(filterPageData:Filter): Observable<any> {
    if(filterPageData.title){
      return this.http.get(URL + 'api/customer/products/page', {params:{title:filterPageData.title!.toString(),page:filterPageData.index.toString(),size:filterPageData.size.toString()}} );
    }else{
       return this.http.get(URL + 'api/customer/products/page', {params:{page:filterPageData.index.toString(),size:filterPageData.size.toString()}} );
    }
   
  }

  public getPageFilteredProductsList(filterData:any): Observable<any> {
    return this.http.post(URL + 'api/customer/products/filtered/page',filterData);
  }

  public getfirtsProductsWithPromotionList(limit:number): Observable<any> {
    return this.http.get(URL + 'api/customer/products/promotions/first/'+limit);
  }
  public loadPromotionsProductsStandardMethod(limit:number): Observable<any>{
    return this.getfirtsProductsWithPromotionList(limit).pipe(
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

  public saveCartItems(cartItems:CartItem[]): Observable<any> {
    return this.http.post(URL + 'api/customer/logged/order',cartItems, { headers: this.createAuthorizationHeader() });
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
            this.snackBar.open('Error getting', 'Close', {
              duration: 7000,
            });
        }
      }
    }

    private createAuthorizationHeader(): HttpHeaders {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token'));
      return headers;
    }


  

  
}
