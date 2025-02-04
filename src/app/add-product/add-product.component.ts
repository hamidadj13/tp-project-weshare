import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  product = {
    title: '',
    price: null,
    description: '',
    categoryId: null,
    images: ['']
  };

  submitProduct() {
    this.productsService.addProduct(this.product).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: err => console.error(err)
    });
  }
}
