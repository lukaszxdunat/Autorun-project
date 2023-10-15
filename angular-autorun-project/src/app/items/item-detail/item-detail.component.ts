import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from '../item-list/item';
import { ItemService } from '../item-list/services/item.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: IItem | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService) {}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.itemService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}