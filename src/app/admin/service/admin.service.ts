import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


const API_URL = 'http://localhost:8085/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  constructor(private http: HttpClient) { }

  postCategory(category: any) {
    return this.http.post(API_URL + 'api/admin/category', category, { headers: this.createAuthorizationHeader() });
  }
  getCategoryById(categoryId: number) {
    return this.http.get(API_URL + 'api/admin/category/' + categoryId, { headers: this.createAuthorizationHeader() });
  }
  updateCategory(categoryId:number,category: any) {
    return this.http.put(API_URL + 'api/admin/category/'+categoryId, category, { headers: this.createAuthorizationHeader() });
  }
  getAllCategories() {
    return this.http.get(API_URL + 'api/admin/categories', { headers: this.createAuthorizationHeader() })
    .pipe(map((res: any) => {
      return res.corps.data;
    }));
  }
  getPageCategoriesByName(page: number, size: number, name: string) {
    const requestOptions = {
      params: {
        page: page.toString(),
        size: size.toString(),
      },
      headers: this.createAuthorizationHeader(),
    };
  
    return this.http.get(API_URL + 'api/admin/search/categories/' + name + '/pages', requestOptions)
      .pipe(map((res: any) => {
        return res.corps.data;
      }));
  }
  getPageCategories(page: number, size: number) {
    const requestOptions = {
      params: {
        page: page.toString(),
        size: size.toString(),
      },
      headers: this.createAuthorizationHeader(),
    };
  
    return this.http.get(API_URL + 'api/admin/categories/pages', requestOptions)
      .pipe(map((res: any) => {
        return res.corps.data;
      }));
  }
  postProduct(product: any) {
    return this.http.post(API_URL + 'api/admin/product', product, { headers: this.createAuthorizationHeader() });
  }

  deleteProduct(id: number) {
    return this.http.delete(API_URL + 'api/admin/product/' + id, { headers: this.createAuthorizationHeader() });
  }
  // getAllProducts() {
  //   return this.http.get(API_URL + 'api/admin/products', { headers: this.createAuthorizationHeader() })
  //   .pipe(map((res: any) => {
  //     return res.corps.data;
  //   }));
  // }
  // getAllProducstByName(name: string) {
  //   return this.http.get(API_URL + 'api/admin/search/products/' + name, { headers: this.createAuthorizationHeader() })
  //   .pipe(map((res: any) => {
  //     return res.corps.data;
  //   }));
  // }

  //pagination
  getAdminPageProductsByName(name: string, page: number, size: number) {
    const requestOptions = {
      params: {
        page: page.toString(),
        size: size.toString(),
      },
      headers: this.createAuthorizationHeader(),
    };
  
    return this.http.get(API_URL + 'api/admin/search/products/' + name + '/pages', requestOptions)
      .pipe(map((res: any) => {
        return res.corps.data;
      }));
  }

  getAdminPageProducts(page: number, size: number) {
    const requestOptions = {
      params: {
        page: page.toString(),
        size: size.toString(),
      },
      headers: this.createAuthorizationHeader(),
    };
  
    return this.http.get(API_URL + 'api/admin/products/pages', requestOptions)
      .pipe(map((res: any) => {
        return res.corps.data;
      }));
  }
  private createAuthorizationHeader(): HttpHeaders {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token'));
    return headers;
  }

  postProductUnit(productUnit: any, productId: number) {
    return this.http.post(API_URL + 'api/admin/product/'+productId+'/unit', productUnit, { headers: this.createAuthorizationHeader() });
  }

  countProductUnits(productId: number): any{
    return this.http.get(API_URL + 'api/admin/product/'+productId+'/units/count', { headers: this.createAuthorizationHeader() }).pipe(map((res: any) => {
      console.log(res.corps.data)
      return res.corps.data;
    }));
  }

  getProductsUnitsByProductId(productId:number){
    return this.http.get(API_URL + 'api/admin/product/'+productId+'/units', { headers: this.createAuthorizationHeader() }).pipe(map((res: any) => {
      return res.corps.data;
    }));
  }
  getProductUnitById(productId:number,unitId:number){
    return this.http.get(API_URL + 'api/admin/product/'+productId+'/unit/'+unitId, { headers: this.createAuthorizationHeader() });
  }
  updateProductUnit(productId:number,unitId:number,productUnit: any) {
    return this.http.put(API_URL + 'api/admin/product/'+productId+'/unit/'+unitId, productUnit, { headers: this.createAuthorizationHeader() });
  }
  deleteCategory(id: number) {
    return this.http.delete(API_URL + 'api/admin/category/' + id, { headers: this.createAuthorizationHeader() });
  }


  getProductById(productId:number){
    return this.http.get(API_URL + 'api/admin/product/'+productId,{ headers: this.createAuthorizationHeader() });
  }

  updateProduct(productId:number,product: any) {
    return this.http.put(API_URL + 'api/admin/product/'+productId, product, { headers: this.createAuthorizationHeader() });
  }
  changeStatusProduct(id:number,enabled:boolean){
    return this.http.put(API_URL + 'api/admin/product/'+id+'/status?enabled='+enabled.toString(),null, { headers: this.createAuthorizationHeader() });
  }
  changeStatusProductUnit(productId:number,unitId:number,enabled:boolean){
    return this.http.put(API_URL + 'api/admin/product/'+productId+'/unit/'+unitId+'/status?enabled='+enabled.toString(),null, { headers: this.createAuthorizationHeader() });
  }


  //promotion
  postPromotion(productId:number,promotion: any) {
    promotion.productId = productId;
    return this.http.post(API_URL + 'api/admin/promotion', promotion, { headers: this.createAuthorizationHeader() });
  }
  countPromotionsByProductId(productId: number): any{
    return this.http.get(API_URL + 'api/admin/promotions/product/'+productId+'/count', { headers: this.createAuthorizationHeader() }).pipe(map((res: any) => {
      return res.corps.data;
    }));
  }

  getPromotionsByProductId(productId:number){
    return this.http.get(API_URL + 'api/admin/promotions/product/'+productId, { headers: this.createAuthorizationHeader() }).pipe(map((res: any) => {
      return res.corps.data;
    }));
  }

  deletePromotion(id: number) {
    return this.http.delete(API_URL + 'api/admin/promotion/' + id, { headers: this.createAuthorizationHeader() });
  }

  getPromotionById(promotionId:number){
    return this.http.get(API_URL + 'api/admin/promotion/'+promotionId,{ headers: this.createAuthorizationHeader() });
  }

  updatePromotion(promotion: any) {
    return this.http.put(API_URL + 'api/admin/promotion/'+promotion.id, promotion, { headers: this.createAuthorizationHeader() });
  }

}

