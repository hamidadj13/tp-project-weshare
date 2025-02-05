import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select'; // Ajout pour la liste déroulante
import { CategoriesService } from '../services/categorie.service'; // Service pour récupérer les catégories

@Component({
 selector: 'app-edit-product',
 standalone: true,
 imports: [
  CommonModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatDividerModule,
  MatSelectModule,
  FormsModule // Importation du module select
 ],
 templateUrl: './edit-product.component.html',
 styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent {
  editForm: FormGroup;
  categories: any[] = []; // Stocke les catégories disponibles

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService, // Service pour récupérer les catégories
    public dialogRef: MatDialogRef<EditProductComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      // Initialisation du formulaire avec les données du produit
      this.editForm = this.fb.group({
      title: [data.product.title, Validators.required],
      price: [data.product.price, [Validators.required, Validators.min(1)]],
      description: [data.product.description, Validators.required],
      categoryId: [data.product.categoryId, Validators.required], // Ajout du champ catégorie
      images: this.fb.array([]) // Initialisation du tableau d'images
      });

      // Chargement des catégories depuis l'API
      this.loadCategories();

      // Pré-remplissage des images
      this.setImages(data.product.images);
  }

  // Charger les catégories depuis l'API
  loadCategories() {
    this.categoriesService.getCategories().subscribe({
    next: (categories) => {
      this.categories = categories;
    },
    error: (err) => {
      console.error('⛔ Erreur lors du chargement des catégories:', err);
    }
    });
  }

  // Accéder au FormArray d'images
  get images(): FormArray<FormControl> {
    return this.editForm.get('images') as FormArray<FormControl>;
  }


  // Ajouter une nouvelle image
  addImage() {
    this.images.push(new FormControl('', Validators.required));
  }

  // Pré-remplir les images
  setImages(images: string[]) {
    images.forEach(img => {
    this.images.push(new FormControl(img, Validators.required));
    });
  }

  // Supprimer une image
  removeImage(index: number) {
    this.images.removeAt(index);
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.editForm.valid) {
    console.log("✅ Formulaire soumis :", this.editForm.value);

    // Traitement des images avant envoi
    const updatedProduct = {
      ...this.editForm.value,
      images: this.editForm.value.images
      .map((img: any) => img?.trim()) // Supprimer les espaces inutiles
      .filter((img: any) => img)   // Filtrer les images vides
    };

    console.log(updatedProduct);

    // Envoi des données au backend
    this.productsService.updateProduct(this.data.product.id, updatedProduct).subscribe({
      next: () => {
      this.snackBar.open('✅ Produit modifié avec succès', 'Fermer', { duration: 3000 });
      this.dialogRef.close(true);
      window.location.reload();
      },
      error: err => console.error('⛔ Erreur lors de la modification:', err)
    });
    } else {
    console.warn("🚨 Formulaire invalide :", this.editForm.value);
    this.snackBar.open('⚠️ Veuillez remplir tous les champs correctement', 'Fermer', { duration: 3000 });
    }
  }
}
