import { Component, OnInit, OnDestroy } from "@angular/core";
import { IItem } from "./item";
import { ItemService } from "./services/item.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  pageTitle: string = "Item list";
  imageWidth: number = 50;
  imageMargin: number = 2;
  filteredElemets: IItem[] = [];
  elements: IItem[] = [];
  _listFilter: string ='';
  errorMessage: string ='';
  sub!: Subscription;

  constructor (private itemService: ItemService ) {}

  get listFilter() :string {
    return this._listFilter
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log("W setterze", value)
    this.filteredElemets = this.performFilter(value);
  }

  performFilter(filterBy: string): IItem[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.elements.filter((product: IItem) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

 
  ngOnInit(): void {
    this.sub = this.itemService.getProducts().subscribe({
      next: products => { 
        this.elements = products;
        this.filteredElemets = this.elements;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}