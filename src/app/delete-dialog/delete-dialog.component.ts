import { Component, OnInit,Inject } from '@angular/core';
import { ContactService } from '../Services/contacts.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contacts } from '../Library/MainLibrary';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit{

  public title : string ;
  public body: string  = "";
  constructor(private cSrv:ContactService,@Inject(MAT_DIALOG_DATA) public data:any){}


  ngOnInit(): void {
    this.title = `${this.data.Title} ID: ${this.data.id}` ;
        this.body = `You are going to delete the contact : ${this.data.name} ${this.data.surname}`;
  }
  

}
