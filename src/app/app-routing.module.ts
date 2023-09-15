import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { SearchContactComponent } from './search-contact/search-contact.component';

const routes: Routes = [
  {
    path : '',
    component : ContactsComponent
  },
  {
    path : 'add',
    component : AddContactComponent
  },
  {
    path : 'search',
    component : SearchContactComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
