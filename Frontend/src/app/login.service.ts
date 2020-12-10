import { Injectable } from '@angular/core';  
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable } from 'rxjs';  
import { Register } from "../app/register";  
import { AddFlight } from './add-flight';
import { AddClass } from './add-class';
import { AddBooking } from './add-booking';
import { AddPassenger } from './add-passenger';
import { CancelRecord } from './cancel-record';
@Injectable({  
  providedIn: 'root'  
})  
export class LoginService {
  getFlightDetails() {
    throw new Error('Method not implemented.');
  }  
  Url :string;  
  token : string;  
  header : any;  
  shareddata:number;
  NoOfSeats:number;
  data:number;
  constructor(private http : HttpClient) {   
  
    this.Url = 'https://localhost:44362';  
  
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
  }  
  
   CreateUser(register:Register)  
   {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.post<Register[]>(this.Url + '/RegisterUser/', register, httpOptions)  
   }  
   getRegisteredUser()
   {
       debugger;
       return this.http.get("https://localhost:44362/GetFlight");
   }
   searchdata(model : any){  
    debugger;    
   return this.http.post<any>('https://localhost:44362/Api/Searchdata/search',model);    
  }  
  showdata(){  
    debugger;    
   return this.http.get<any>('https://localhost:44362/Api/Searchdata/showdata');    
  }
   

  login(email:string,password:string)
  {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
    return this.http.post<any>("https://localhost:44362/api/login?email="+email+"&password="+password,httpOptions)
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

  GetFlightById(id:number){
    return this.http.get<any>("https://localhost:44362/GetbyID?id="+id);
  }

  GetEconomyCostById(id:number)
  {
    return this.http.get<any>("https://localhost:44362/api/GetEconomyCost?id="+id);
  }

  GetBusinessCostById(id:number)
  {
    return this.http.get<any>("https://localhost:44362/api/GetBusinessCost?id="+id);
  }

  getFlight():Observable<AddFlight[]>    
  {    
    return this.http.get<AddFlight[]>(this.Url + '/GetAllFlights');    
  }

  DeleteFlight(FlightId:number):Observable<any>    
  {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };    
    return this.http.post<AddFlight[]>(this.Url + '/RemoveFlight?Id='+FlightId,httpOptions);    
  }
  GetlastFlight()
  {
    return this.http.get<any>("https://localhost:44362/api/getlastflight");
  }
  GetClassId(id:number)
  {
    return this.http.get<any>("https://localhost:44362/api/getclass?id="+id);
  }
  GetCurrentDate()
  {
    return this.http.get<any>("https://localhost:44362/api/getsysdate");
  }
  createbooking(addclass:AddBooking)  
  {  
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
   return this.http.post<AddBooking[]>(this.Url + '/Api/ConfirmBooking/', addclass, httpOptions)  
  }
  ChangeAvailableTickets(id:number)
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>("https://localhost:44362/api/getavailableseats?id="+id,httpOptions);
  }
  createpassenger(addpass:AddPassenger)  
  {  
    debugger;
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
   return this.http.post<AddPassenger[]>("https://localhost:44362/Api/AddPassenger/", addpass, httpOptions)  
  }
  Getlastbooking()
  {
    return this.http.get<any>("https://localhost:44362/api/getlastbooking");
  }
  CancelBooking(id:number) 
   {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.post<any>("https://localhost:44362/CancelBooking?id="+ id, httpOptions)  
   }
   CancelledRecord(cancel:CancelRecord)
   {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.post<any>("https://localhost:44362/Cancel",cancel, httpOptions)
   }
   GetBookingId(id:number)
   {
    return this.http.get<any>("https://localhost:44362/GetBookingId?id="+ id)
   }
   GetFlightByBId(id:number)
   {
     debugger;
    return this.http.get<any>("https://localhost:44362/GetFlightbyBid?id="+id)
   }
   GetBookingAmount(id:number)
   {
    return this.http.get<any>("https://localhost:44362/GetBookingAmount?id="+ id)
   }
   EnterCancel(Bid:number)
   {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.post<any>("https://localhost:44362/Cancellation?BookingID="+Bid, httpOptions);
   }
}
