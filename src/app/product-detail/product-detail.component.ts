import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatExpansionModule, 
    MatGridListModule, 
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  product$!: Observable<Product>;
  isAdmin = false;
  isLoading = false;

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.productsService.getProductById(productId);

    // Vérifier si l'utilisateur est admin
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      
    });
  }

  addToCart(product: Product) {
    console.log('🛒 Produit ajouté au panier:', product);
  }

  openEditDialog(product: Product) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '400px',
      data: { product }
    });

    // Met à jour la page après modification
    dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
        this.isLoading = true; // ✅ Afficher le spinner
        this.productsService.getProductById(updatedProduct.id).subscribe({
          next: product => {
            this.product$ = new Observable(observer => observer.next(product));
            this.isLoading = false; // ✅ Cacher le spinner après chargement
            this.snackBar.open('✅ Produit mis à jour avec succès', 'Fermer', { duration: 3000 });
          },
          error: err => {
            console.error(err);
            this.isLoading = false;
          }
        });
      }
    });
  }

  deleteProduct(product: Product) {
    if (confirm('⚠️ Voulez-vous vraiment supprimer ce produit ?')) {
      this.isLoading = true; // ✅ Afficher le spinner pendant la suppression
      this.productsService.deleteProduct(product.id).subscribe({
        next: () => {
          this.snackBar.open('🗑️ Produit supprimé avec succès', 'Fermer', { duration: 3000 });
          this.isLoading = false;
          this.router.navigate(['/products']); // Redirection après suppression
        },
        error: err => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }
}
