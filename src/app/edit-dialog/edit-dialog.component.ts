import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '../Services/contacts.service';
import { ContactDialogReturn, Contacts, Action } from '../Library/MainLibrary';
import { error } from 'jquery';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  public contact: ContactDialogReturn = null;
  public title: string;
  public contactForm: FormGroup = null;
  public contactArray : Array<Contacts> = [];
  updatedData: Contacts = { id: 0, name: '', surname: '', email: '', phoneNumber1: null , phoneNumber2: null };


  constructor(private contactSrv: ContactService, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialogRef: MatDialogRef<EditDialogComponent>) {
  }


  ngOnInit(): void {
    this.title = this.data.title;
    this.contactForm = this.fb.group(
      {
        id: [null],
        name: [null],
        surname: [null],
        email: [null],
        phoneNumber1: [null],
        phoneNumber2: [null]
      });
      if (this.data.id !=0)
      {
        this.contact = new ContactDialogReturn();
        this.contact.action = Action.UPDATE;
        this.contact.id = this.data.id;
        this.contact.name = this.data.name;
        this.contact.surname = this.data.surname;
        this.contact.email = this.data.email;
        this.contact.phoneNumber1 = Number(this.data.phoneNumber1);
        this.contact.phoneNumber2 = Number(this.data.phoneNumber2);
        this.contactForm.patchValue({ id: this.contact.id, name: this.contact.name, surname: this.contact.surname, email: this.contact.email, phoneNumber1: this.contact.phoneNumber1, phoneNumber2: this.contact.phoneNumber2 });
      }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  onSubmit(){
    this.contact = new ContactDialogReturn();
    this.contact.id = Number(this.contactForm.get('id').value);
    this.contact.name = this.contactForm.get('name').value;
    this.contact.surname = this.contactForm.get('surname').value;
    this.contact.email = this.contactForm.get('email').value;
    this.contact.phoneNumber1 = Number(this.contactForm.get('phoneNumber1').value);
    this.contact.phoneNumber2 = Number(this.contactForm.get('phoneNumber2').value);
    if (this.contact.id != 0){
      this.contact.action= Action.UPDATE;
      console.log(this.contact)
      this.contactSrv.updateContact(this.contact).subscribe(() => {
        // Update successful
        this.dialogRef.close(true); // Pass a value to indicate success
      },
      (error) => {
        // Handle error
        console.error(error);
      })
    }
    else{
      console.log(error)
    }

  }

}
