import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ItemListComponent } from '../items/item-list/item-list.component';
import { IItem } from '../items/item-list/item';
import { ItemService } from '../items/item-list/services/item.service';


@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.scss']
})
export class TableDialogComponent implements OnInit {

  description: string = "Edit row";

  form = this.fb.group({
    productName: [this.item.productName, Validators.required],
    productCode: [this.item.productCode, Validators.required],
    description: [this.item.description, Validators.required],
    productPrice: [this.item.price, Validators.required],
  });

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private item: IItem,
    private dialogRef: MatDialogRef<TableDialogComponent>,
    private itemService: ItemService) { }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
    this.itemService.updateProduct(this.form.value);
  }

}

export function openEditRowDialog(dialog: MatDialog, item: IItem) {

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;

  config.data = {
    ...item
  }
  console.log(item);
  const dialogRef = dialog.open(TableDialogComponent, config);

  return dialogRef.afterClosed()

}
