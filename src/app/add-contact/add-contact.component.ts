import { Component, OnInit, Inject } from '@angular/core';
import { ContactService } from '../Services/contacts.service';
import { Action,ContactDialogReturn,Contacts } from '../Library/MainLibrary';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog'
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent  {
  
  public dataForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactSrv: ContactService
  ) {
    this.dataForm = this.formBuilder.group({
      name: null,
      surname: null,
      email: null,
      phoneNumber1: null,
      phoneNumber2: null,
    });
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      return;
    }

    const data = this.dataForm.value;
    console.log(this.dataForm.value.name);

    this.contactSrv.createNewContact(data).subscribe( response => {
          console.log('Data added successfully');
          this.dataForm.reset(); // Reset the form to its initial state
        },
        error => {
          console.error('Error adding data:', error);
        }
      );
  }
  
}
