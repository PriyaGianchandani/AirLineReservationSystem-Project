import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddBooking } from '../add-booking';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  PassengerForm:FormGroup

  login = false
  user
  err:any;
  fid: number;
  mail: string;
  cid: any;
  cdetails: string;
  myDate = new Date();
  currentdate: any;
  totaltickets: number;
  totalamount: number;
  return: any;
  returnTicket: boolean;
  data: boolean;
  date= new Date()

  constructor(private router:Router,private loginService:LoginService) { 
    this.PassengerForm=new FormGroup({
      FlightID :new FormControl(null,[Validators.required]),
      Email :new FormControl(null,[Validators.required]),
      ClassID:new FormControl(null,[Validators.required]),
      BookingDate:new FormControl(null,[Validators.required]),
      NoOfTickets :new FormControl(null,[Validators.required]),
      BookingAmount:new FormControl(null,[Validators.required]),
      DateOfDeparture:new FormControl(null,[Validators.required]),
      ReturnDate:new FormControl(null,[Validators.required]),
      ReturnTicket:new FormControl(null,[Validators.required]),
      ClassDetails:new FormControl(null,[Validators.required]),
      })
  }

  get FlightID()
  {
    return this.PassengerForm.get("FlightID");
  }

  get Email()
  {
    return this.PassengerForm.get("Email");
  }

  get ClassID()
  {
    return this.PassengerForm.get("ClassID");
  }

  get BookingDate()
  {
    return this.PassengerForm.get("BookingDate");
  }

  get NoOfTickets()
  {
    return this.PassengerForm.get("NoOfTickets");
  }

  get BookingAmount()
  {
    return this.PassengerForm.get("BookingAmount");
  }

  get DateOfDeparture()
  {
    return this.PassengerForm.get("DateOfDeparture");
  }

  get ReturnDate()
  {
    return this.PassengerForm.get("ReturnDate");
  }

  get ReturnTicket()
  {
    return this.PassengerForm.get("ReturnDate");
  }
  get ClassDetails()
  {
    return this.PassengerForm.get("ClassDetails")
  }
  ngOnInit(): void {
    this.getDetails();
  }

  ngDoCheck(){
    if(sessionStorage.getItem('user')){
      this.login=true
      this.user=sessionStorage.getItem('user')
    }else{
      this.login=false
      this.user=""
    }
  }

  logout(){
    sessionStorage.clear()
    this.login=false
    this.user=""
    this.router.navigate(['/home'])
  } 

  ChangeAvailability(id:number)
  {
    this.loginService.ChangeAvailableTickets(id).subscribe(    
      ()=>    
      {    
        this.data = true;    
        //this.massage = 'Data saved Successfully'; 
        //this.router.navigateByUrl('/class-details');
        this.PassengerForm.reset();    
      });  
  }
  ConfirmBooking(addbooking:AddBooking)
  {
    this.loginService.createbooking(addbooking).subscribe(    
      ()=>    
      {    
        this.data = true;    
        //this.massage = 'Data saved Successfully'; 
        //this.router.navigateByUrl('/class-details');
        window.alert("Booking SUCCESSFUL!!!");
        this.PassengerForm.reset();    
      });     
  }
  onFormSubmit()    
  {    
    if(this.PassengerForm.valid)
     {
       this.err="Booking registered sucessfully"; 
     }
     else
     {
       this.err="Please Enter all the Details"
     }
     console.log(this.PassengerForm.value);
    const user = this.PassengerForm.value;    
    this.ConfirmBooking(user);   
    this.ChangeAvailability(+sessionStorage.getItem('FlightID'))
    this.router.navigate(['/passengerdetails']) 
  }  
getDetails()
{
  this.fid =+sessionStorage.getItem('FlightID')
  this.mail = sessionStorage.getItem('user');
  this.cid = this.loginService.GetClassId(this.fid).subscribe((data)=>{this.cid = data;console.log(data)})
  this.cdetails = sessionStorage.getItem('ClassDetails')
  this.currentdate = this.loginService.GetCurrentDate().subscribe((data)=>{this.currentdate = data;console.log(data)})
  this.totaltickets=+sessionStorage.getItem('NoOfTickets');
  this.totalamount = +sessionStorage.getItem('TotalCost')
  this.return = null
  this.returnTicket = false;
}
  

}
