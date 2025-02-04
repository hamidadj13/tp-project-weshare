import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from "@angular/router";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule, MatInputModule, RouterModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  
  isAdmin = false; 
  products: any[] = [];
  filteredProducts: any[] = [];
  displayedProducts: any[] = [];
  pageSize = 4;
  pageSizeOptions = [4, 8, 12, 16, 20, 24];
  searchControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productsService : ProductsService, private dialog: MatDialog, private authService: AuthService) {}

  openAddProductDialog() {
  this.dialog.open(AddProductComponent, {
    width: '400px',
  });
  }


  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data; // Initialisation du filtre
        this.updateDisplayedProducts(0, this.pageSize);
      },
      error: (error) => console.error(error)
    });

    this.authService.restoreAdminStatus(); // Restaurer le rôle après un refresh
      this.authService.isAdmin$.subscribe(isAdmin => {
        this.isAdmin = isAdmin;
        console.log("isAdmin dans ProductsComponent:", this.isAdmin); // Debug
    });

    // Écoute les changements dans l'input et filtre les produits
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.filterProducts(value || '');
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.updateDisplayedProducts(startIndex, event.pageSize);
  }

  private updateDisplayedProducts(startIndex: number, pageSize: number) {
    this.displayedProducts = this.filteredProducts.slice(startIndex, startIndex + pageSize);
  }

  private filterProducts(searchText: string) {
    this.filteredProducts = this.products.filter(product => 
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    this.updateDisplayedProducts(0, this.pageSize);
  }
}
