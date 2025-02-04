import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    private snackBar: MatSnackBar, // ✅ Ajout de MatSnackBar
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      title: [data.product.title, Validators.required],
      price: [data.product.price, [Validators.required, Validators.min(1)]],
      description: [data.product.description, Validators.required],
      images: [data.product.images[0], Validators.required]
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.productsService.updateProduct(this.data.product.id, this.editForm.value).subscribe({
        next: () => {
          this.snackBar.open('✅ Produit modifié avec succès', 'Fermer', { duration: 3000 }); // ✅ Affichage du snackBar
          this.dialogRef.close(true);
        },
        error: err => console.error('⛔ Erreur lors de la modification:', err)
      });
    }
  }
}
