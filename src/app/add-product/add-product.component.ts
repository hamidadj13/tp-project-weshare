import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesService } from '../services/categorie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categories: any[] = []; // Stocke les catégories récupérées

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private snackBar: MatSnackBar,
  ) {}

  product = {
    title: '',
    price: null,
    description: '',
    categoryId: null, // On stocke uniquement l'ID
    images: [] as string[]
  };

  ngOnInit() {
    this.fetchCategories();
  }

  /**
   * ✅ Récupère les catégories depuis l'API
   */
  fetchCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error("⛔ Erreur lors du chargement des catégories:", err)
    });
  }

  /**
   * ✅ Ajoute un champ pour une nouvelle image
   */
  addImage() {
    this.product.images.push('');
  }

  /**
   * ✅ Supprime une image à un index donné
   */
  removeImage(index: number) {
    if (this.product.images.length > 1) {
      this.product.images.splice(index, 1);
    }
  }

  /**
   * ✅ Nettoie le tableau d'images avant envoi (évite les valeurs vides)
   */
  submitProduct() {
    // 🛠 Nettoyage : Supprime les entrées vides et les espaces inutiles
    this.product.images = this.product.images
      .map(img => img.trim()) // Supprime les espaces autour des URLs
      .filter(img => img.length > 0); // Supprime les entrées vides

    console.log("📤 Produit envoyé :", this.product);

    this.productsService.addProduct(this.product).subscribe({
      next: () => {
        this.snackBar.open('✅ Produit modifié avec succès', 'Fermer', { duration: 3000 });
        this.dialogRef.close(true);
        window.location.reload();
       
      },
      error: err => console.error("⛔ Erreur :", err)
    });
  }
}
