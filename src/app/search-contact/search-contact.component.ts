import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../Services/contacts.service';
import { Contacts } from '../Library/MainLibrary';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs'
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.css']
})
export class SearchContactComponent implements OnInit{
  public contactArray: any = [];
  public contactsArray: any = [];
  public contactSubscriber: any;
  public contacts: Contacts = null;
  public c: any = [];
  //declarations for datatables plugin
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  public dtTrigger: Subject<any> = new Subject<any>();
  public dataTableOptions: DataTables.Settings = {};
  public _id ;
  public _surname = "";

  constructor(private contactSrv: ContactService,) {
    this.dataTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
      columnDefs: [
        { orderable: false, targets: 0 },
        { orderable: false, targets: 2 },
      ]
    };
  }

  public ngOnInit(): void {
    this.contactSrv.getApiContacts().subscribe(users => {
          this.contactArray = users;
    });
 }
  
  searchContact(): void {
    console.log(this._id);
    console.log(this._surname);
    this.contactSrv.getApiContactsByID(this._id).subscribe((data) => {
        this.contacts = data;
        this.c = data;
        console.log(this.contacts);
        console.log(this.contacts.id);
        
        });
  }



}
