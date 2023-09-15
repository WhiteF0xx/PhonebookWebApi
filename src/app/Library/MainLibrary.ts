export enum Action {CREATE,Delete,UPDATE};

// import { DeleteDialogComponent } from './../app/delete-dialog/delete-dialog.component';
export class Globals{
  public static apiURL:string = "https://localhost:7255/";
}
export class Contacts{
  public id : number;
  public name : string;
  public surname : string;
  public email : string;
  public phoneNumber1 : number;
  public phoneNumber2 : number;
}

export class Addresses{
  public id : number;
  public addressName : string;
  public personId : number;
}

export class ContactDialogReturn extends Contacts{
  public action : Action;
}

export class AddressDialogReturn extends Addresses{
  public action : Action;
}

export class ContactInlineEdit extends Contacts
{
  public isEdit : boolean = false;
}