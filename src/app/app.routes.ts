import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard]
  }, 

  
   

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },

      { path: 'products', component: ProductsComponent },

      { path: 'products/:id', component: ProductDetailComponent },

    ]
  }
];
