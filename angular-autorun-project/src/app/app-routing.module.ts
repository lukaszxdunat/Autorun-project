import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: 'products', component: ItemListComponent },
  { path: 'products/:id', component: ItemDetailComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '**', redirectTo: 'products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
