import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Addresses, Globals } from '../Library/MainLibrary';
@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  private address : Array<Addresses>=[];
  private apiURL : string =Globals.apiURL+"Addresses/";
  private responseHeader : HttpHeaders = new HttpHeaders({'content-Type':'application/json'});
  
  constructor(private http:HttpClient) {}
   //Get All Adresses
   public getApiSongs():Observable<Addresses[]>{
    return this.http.get<Addresses[]>(this.apiURL,{responseType:'json'});
  }
  //Get Address by ID
  public getApiSongsByID(id :number):Observable<Addresses>{
    return this.http.get<Addresses>(`${this.apiURL}ByAddressID/${id}`,{responseType:'json'});
  }
  //Get Address by Contact ID
  public getApiSongsByGroupID(id :number):Observable<Addresses[]>{
    return this.http.get<Addresses[]>(`${this.apiURL}ByContactID/${id}`,{responseType:'json'});
  }
  //Add new Address
  public createNewAddress(address:Addresses):Observable<Addresses[]>{

  let obj ={
    "id": address.id,
    "songName": address.addressName,
    "contactId": address.personId
  }
   return this.http.post<Addresses[]>(`${this.apiURL}`,JSON.stringify(obj),{headers:this.responseHeader});
  }
  //Update Address
  public updateSong(address:Addresses):Observable<Addresses[]>{
    let obj ={
      "id": address.id,
      "songName": address.addressName,
      "contactId": address.personId
    }
    return this.http.put<Addresses[]>(`${this.apiURL}${address.id}`,JSON.stringify(obj),{headers:this.responseHeader});
  }
  //Delete Address
  public deleteAddress(id:number):Observable<Addresses[]>{
    return this.http.delete<Addresses[]>(`${this.apiURL}${id}`,{headers:this.responseHeader});
  }
}
