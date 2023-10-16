import { Component } from "@angular/core";
import { IItem } from "./item";
import { ItemService } from "./services/item.service";
import { Subscription, filter } from "rxjs";
import { Router } from "@angular/router";
import { openEditRowDialog } from "src/app/table-dialog/table-dialog.component";
import { MatDialog } from "@angular/material/dialog";


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
  _listFilter: string = '';
  errorMessage: string = '';
  sub!: Subscription;
  preventSingleClick = false;
  timer: any;
  delay: Number | undefined;

  constructor(private itemService: ItemService, private router: Router, private dialog: MatDialog) { }

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

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredElemets = this.performFilter(value);
  }

  performFilter(filterBy: string): IItem[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.elements.filter((product: IItem) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  openDetails(element: any) {
    this.preventSingleClick = false;
    const delay = 300;
    this.timer = setTimeout(() => {
      if (!this.preventSingleClick) {
        const url = 'products/' + element;
        this.router.navigateByUrl(url)
      }
    }, delay);
  }

  editRow(item: IItem) {
    this.preventSingleClick = true;
    clearTimeout(this.timer);

    openEditRowDialog(this.dialog, item)
      .pipe(
        filter(value => !!value)
      )
      .subscribe();
  }

}