import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Contacts,Globals } from '../Library/MainLibrary';
import { HttpClient ,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class ContactService {
  private contacts : Array<Contacts>=[];
  private apiURL : string =Globals.apiURL+"Person";
  private responseHeader : HttpHeaders = new HttpHeaders({'content-Type':'application/json', 'Access-Control-Allow-Origin': '*' });
  constructor(private http:HttpClient) {}

  

//Get All Contacts
public getApiContacts():Observable<Contacts[]>{
    return this.http.get<Contacts[]>(`${this.apiURL}`);
}

//Get Contacts by id
public getApiContactsByID(id :number):Observable<Contacts>{
    return this.http.get<Contacts>(`${this.apiURL}/${id}`,{responseType:'json'});
}

//Add new Contacts
public createNewContact(contact:Contacts):Observable<Contacts[]>{
let obj ={
    "id": contact.id,
    "name": contact.name,
    "surname": contact.surname,
    "email": contact.email,
    "phoneNumber1": contact.phoneNumber1,
    "phoneNumber2": contact.phoneNumber2

}
   return this.http.post<Contacts[]>(`${this.apiURL}`,JSON.stringify(obj),{headers:this.responseHeader});
}

//Update Contact
public updateContact(contact:Contacts):Observable<Contacts[]>{
let obj ={
  "id": contact.id,
  "name": contact.name,
  "surname": contact.surname,
  "email": contact.email,
  "phoneNumber1": contact.phoneNumber1,
  "phoneNumber2": contact.phoneNumber1
}
 return this.http.put<Contacts[]>(`${this.apiURL}/${contact.id}`,JSON.stringify(obj),{headers:this.responseHeader});
}

//Delete Contact
public deleteContact(id:number):Observable<Contacts[]>{
  const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  return this.http.delete<Contacts[]>(`${this.apiURL}/${id}`,{headers:this.responseHeader});
}
}
