import { Injectable } from '@angular/core';  
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable } from 'rxjs';  
import { Register } from "../app/register";  
import { AddFlight } from './add-flight';
import { AddClass } from './add-class';
import { map } from 'rxjs/operators';

@Injectable({  
  providedIn: 'root'  
})  
export class LoginService {  
  Url :string;  
  token : string;  
  header : any;  
  shareddata:number;
  NoOfSeats:number;
  data:number;
  employeeList : AddFlight[];

  constructor(private http : HttpClient) {   
  
    this.Url = 'http://localhost:50924/';  
  
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
  }  
  
   CreateUser(register:Register)  
   {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.post<Register[]>(this.Url + '/Api/Register/', register, httpOptions)  
   }  
   getRegisteredUser()
   {
       debugger;
       return this.http.get("http://localhost:50924/GetFlight");
   }
   searchdata(model : any){  
    debugger;    
   return this.http.post<any>('http://localhost:50924//Api/Searchdata/search',model);    
  }  
  showdata(){  
    debugger;    
   return this.http.get<any>('http://localhost:50924/Api/Searchdata/showdata');    
  }
   

  login(email:string,password:string)
  {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
    return this.http.post<any>("http://localhost:50924/api/login?email="+email+"&password="+password,httpOptions)
  }

  createflight(addflight:AddFlight)  
  {  
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
   return this.http.post<AddFlight[]>(this.Url + '/Api/AddFlight/', addflight, httpOptions)  
  }

  createclass(addclass:AddClass)  
  {  
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
   return this.http.post<AddClass[]>(this.Url + '/Api/AddClass/', addclass, httpOptions)  
  }

  setNoOfSeats(data)
  {
    this.NoOfSeats=data;
  }

  getNoOfSeats(){
    return this.NoOfSeats
  }
  DeleteFlight(FlightId:number):Observable<any>    
  {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };    
    return this.http.post<AddFlight[]>(this.Url + '/RemoveFlight?Id='+FlightId,httpOptions);    
  }    
 
  getFlight():Observable<AddFlight[]>    
  {    
    return this.http.get<AddFlight[]>(this.Url + '/GetAllFlights');    
  }    
 

}
