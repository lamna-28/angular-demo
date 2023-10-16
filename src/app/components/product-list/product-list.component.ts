import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products!: IProduct[];
  constructor(private productServices: ProductService) {

  }
  async ngOnInit() {
    try {
      this.products = await lastValueFrom(this.productServices.getProduct())
    } catch (error) {

    }
  }
  async removeProduct(id: number) {
    const confirm = window.confirm('Bạn có chắc chắn xóa không ?')
    if (!confirm) return;
    try {
      await lastValueFrom(this.productServices.removeProduct(id))
      this.products = this.products.filter(item => item.id !== id)
      alert("Xóa thành công")
    } catch (error) {

    }
  }
}
