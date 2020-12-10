import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-cancelbooking',
  templateUrl: './cancelbooking.component.html',
  styleUrls: ['./cancelbooking.component.css']
})
export class CancelbookingComponent implements OnInit {
  CancelBookingForm: FormGroup;
  dataSaved = false;  
  massage: string;
  bookingid
  a: number;
  login = false
  user  
  bid: any;
  fid: any;
  bookingamount: any;
  cdate: any;
  refundamount: number;
  cancelobj:any={}
  ba: any;
  RefundAmount
  val=false
  constructor(private formbulider: FormBuilder,private loginService:LoginService,private router:Router) { 
    this.CancelBookingForm = this.formbulider.group({    
      BookingId:['',[Validators.required]]  
    })
  }
  ngOnInit(): void {  
  debugger;
  
}
get BookingId(){
  return this.CancelBookingForm.get("BookingId");
  }

  getFlightbyId(bid:number)
  {
    debugger;
    this.fid = this.loginService.GetFlightByBId(bid).subscribe(
      (data)=>{
        debugger;
        this.cancelobj.FlightID = data;
        console.log(data)})
  }
  /*onSubmit()
  {
    debugger;
    this.cancelobj.BookingId= this.CancelBookingForm.value.BookingId
    
    this.getFlightbyId(this.cancelobj.BookingId)
    debugger;
    //this.cancelobj.FlightID=this.fid;
    this.ba = this.loginService.GetBookingAmount(this.CancelBookingForm.value.BookingId).subscribe((data)=>{this.bookingamount = data;})//console.log(data)
    this.cdate = this.loginService.GetCurrentDate().subscribe((data)=>{this.cancelobj.CancellationDate=data;})//console.log(data)
    this.cancelobj.RefundAmount = this.bookingamount-(this.bookingamount*0.2)
    if(this.login)
    {
      this.DeleteBooking(this.CancelBookingForm.value.BookingId)
      this.CancelRecord(this.cancelobj) 
      this.massage="Your Booking has been Cancelled And the Amount"+ this.refundamount +"will be transferred back into your Account Thank you for Booking with us!!!"
    }
    else
    {
      alert("Please Login First")
    }
  }*/
  CancelRecord(can:any)
  {
    debugger;
    this.loginService.CancelledRecord(can).subscribe(  
      () => {  
        debugger;
       this.dataSaved = true;  
       alert("Deleted Successfully");   
      } 
     );  
  }

  DeleteBooking(a: number) {  

    if (confirm("Are You Sure To Delete this Informations")) {  
     this.loginService.CancelBooking(a).subscribe(  
      () => {  
       this.dataSaved = true;  
       alert("Deleted Successfully");   
      } 
     );  
    }  
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

  EnterCancel()
  {
    debugger
    if(this.login)
    {
      if(this.CancelBookingForm.valid)
      {
       this.CallEnterCancel(this.CancelBookingForm.value.BookingId)
       this.val=true
      }
    }
    else{
      alert("Please Login First")
      this.router.navigate(['/Login'])
    }
  }

  CallEnterCancel(Bid:number)
  {
    debugger;
    this.loginService.EnterCancel(Bid).subscribe(
      data=>{
        debugger;
        this.DeleteBooking(Bid);
        alert(data.message)
        this.RefundAmount=data.RefundAmount;
        this.massage="Your Refund Amount is "+this.RefundAmount
      }
    )

  }
}