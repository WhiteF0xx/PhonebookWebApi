import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Action, ContactDialogReturn, Contacts } from '../Library/MainLibrary'
import { Subject } from 'rxjs'
import { ContactService } from '../Services/contacts.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})


export class ContactsComponent implements OnInit, OnDestroy, AfterViewInit {
  public contactsArray: Array<Contacts> = [];
  public contactArray: Array<Contacts> = [];
  public contactSubscriber: any;
  public contact: Contacts = null;
  //declarations for datatables plugin
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public dialogCfg: MatDialogConfig;


  constructor(private contactSrv: ContactService, public dialog: MatDialog, private toastr: ToastrService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
      searching: false,
      columnDefs: [
        { orderable: false, targets: 0 },
        { orderable: false, targets: 2 },
      ]
    };
  }

  ngAfterViewInit(): void {
    // this.dtTrigger.next(null); --> Datatable warning error
  }


  ngOnInit(): void {
    this.getContacts();
    this.contactSubscriber = this.contactSrv.getApiContacts().subscribe((data) => {
      this.contactArray.slice(0);
      this.contactArray = data;
      setTimeout(() => { this.dtTrigger.next(this.contactArray); }, 100);
    });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.contactSubscriber.unsubscribe();
  }

  private getContacts() {
    this.contactSubscriber = this.contactSrv.getApiContacts().subscribe((data) => {
      this.contactsArray.splice(0);
      this.contactsArray = data;
    });
  }

  public getContactString(id: number): string {
    return this.contactArray.find(x => x.id === id).name;
  }



  public buildDialogCfg() {
    this.dialogCfg = new MatDialogConfig();
    this.dialogCfg.disableClose = true;
    this.dialogCfg.autoFocus = true;
    this.dialogCfg.hasBackdrop = true;
    this.dialogCfg.enterAnimationDuration = '500ms';
    this.dialogCfg.exitAnimationDuration = '500ms';
    this.dialogCfg.width = '40%';
  }

  onDeleteContact(_contact: Contacts) {
    this.buildDialogCfg();
    this.dialogCfg.data = { Title: "Delete Contact with", id: _contact.id, name: _contact.name, surname: _contact.surname, action: "delete" }
    const dialogRef = this.dialog.open(DeleteDialogComponent, this.dialogCfg);
    dialogRef.afterClosed().subscribe((response) => {
      if (response === 'yes') {
        this.contactSrv.deleteContact(_contact.id).subscribe((returnData) => {
          this.contactArray.splice(0);
          this.contactArray = returnData;
          this.renderDataTable();
        });
      }
    });
  }

  onEditContact(_contact: Contacts) {
    this.buildDialogCfg();
    this.dialogCfg.data = { title: "Edit Contact ", id: _contact.id, name: _contact.name, surname: _contact.surname, email: _contact.email, phoneNumber1: _contact.phoneNumber1, phoneNumber2: _contact.phoneNumber2 };
    const dialogRef = this.dialog.open(EditDialogComponent, this.dialogCfg);
    dialogRef.afterClosed().subscribe(() => {
      this.renderDataTable();
    });
  }

  public renderDataTable() {
    if (this.dtElement) {
      this.contactSubscriber.unsubscribe();
      this.getContacts();
      this.contactSubscriber = this.contactSrv.getApiContacts().subscribe((data) => {
        this.contactArray.slice(0);
        this.contactArray = data;
      });
    }
  }




}
