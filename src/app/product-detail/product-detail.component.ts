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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, of } from 'rxjs';
import { EditProductComponent } from '../edit-product/edit-product.component';

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
    MatProgressSpinnerModule
  ],
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
    this.productsService.getProductById(productId).subscribe(product => {
      console.log('Produit récupéré:', product);

      // Vérifie si `images` est une string JSON et convertit en tableau si nécessaire
      if (typeof product.images === 'string') {
        try {
          product.images = JSON.parse(product.images); // Tente de parser la chaîne JSON
        } catch (error) {
          console.error('Erreur de parsing des images:', error);
          product.images = []; // Évite une erreur si parsing échoue
        }
      }

      // Si `images` est null ou autre, s'assurer que c'est un tableau vide
      if (!Array.isArray(product.images)) {
        product.images = [];
      }

      // Reformatage des images pour s'assurer qu'elles sont au bon format
      product.images = this.reformatImages(product.images);

      this.product$ = of(product); // Met à jour correctement l'Observable
    });

    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  /**
   * ✅ Nettoie les images reçues et les reformate si nécessaire
   */
  reformatImages(images: string[]): string[] {
    return images.map(image => {
      // Si l'image est une chaîne encodée sous forme de tableau (ex : "[\"https://...\"]")
      if (image.startsWith('["') || image.endsWith('"]')) {
        // Enlever les guillemets inutiles et les crochets
        return image.replace(/[\[\]"]/g, '').trim();
      }
      // Si l'image est déjà dans le bon format, la retourner telle quelle
      return image.trim();
    });
  }

  openEditDialog(product: Product) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '400px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
        this.isLoading = true;
        this.productsService.getProductById(updatedProduct.id).subscribe({
          next: product => {
            this.product$ = of(product);
            this.isLoading = false;
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
      this.isLoading = true;
      this.productsService.deleteProduct(product.id).subscribe({
        next: () => {
          this.snackBar.open('🗑️ Produit supprimé avec succès', 'Fermer', { duration: 3000 });
          this.isLoading = false;
          this.router.navigate(['/products']);
        },
        error: err => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }
}
