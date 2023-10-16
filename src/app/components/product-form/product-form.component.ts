import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  productForm = this.formBuilder.group({
    name: [''],
    price: [0],
    description: [''],
  });
  product!: IProduct;
  mode: "create" | "update" = "create";
  constructor(
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService) {
  }
  async ngOnInit() {
    const { id } = this.router.snapshot.params;
    if (id) {
      this.product = await lastValueFrom(this.productService.getProductById(+id));
      console.log(this.product)
      this.productForm.patchValue(this.product)
      this.mode = "update";
    }
  }
  async onSubmit() {
    try {
      if (this.mode === "create") {
        await lastValueFrom(this.productService.addProduct(this.productForm.value as IProduct))
        alert("Thêm sản phẩm thành công")
      } else {
        await lastValueFrom(this.productService.updateProduct({ ...this.product, ...this.productForm.value, } as IProduct))
        alert("Cập nhật sản phẩm thành công")
      }

    } catch (error: any) {
      console.log(error.message)
    }

  }
}
