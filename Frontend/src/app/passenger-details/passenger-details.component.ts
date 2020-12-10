import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddPassenger } from '../add-passenger';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {

  PassengerForm:FormGroup

  login = false
  user
  err:any;
  data: boolean;
  len: number;
  bid: any;
  mail: string;
  seatno: any=[];
  seat: any;
  constructor(private router:Router,private passenger:LoginService){
    this.PassengerForm=new FormGroup({
      
      FirstName :new FormControl(null,[Validators.required]),
      LastName:new FormControl(null,[Validators.required]),
      Age:new FormControl(null,[Validators.required]),
      BookingID :new FormControl(null,[Validators.required]),
      Email:new FormControl(null,[Validators.required]),
      SeatID:new FormControl(null,[Validators.required]),
      })
  }

  /*get PassengerID()
  {
    return this.PassengerForm.get("PassengerID");
  }*/

  get FirstName()
  {
    return this.PassengerForm.get("FirstName");
  }

  get LastName()
  {
    return this.PassengerForm.get("LastName");
  }

  get Age()
  {
    return this.PassengerForm.get("Age");
  }

  get BookingID()
  {
    return this.PassengerForm.get("BookingID");
    
  }

  get Email()
  {
    return this.PassengerForm.get("Email");
  }
  get SeatID()
  {
    return this.PassengerForm.get("SeatID");
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
        
  onFormSubmit()    
  {    
    if(this.PassengerForm.valid)
     {
       this.err="Passenger registered sucessfully"; 
     }
     else
     {
       this.err="Please Enter all the Details"
     }
     console.log(this.PassengerForm.value);
     //const user = this.PassengerForm.value;
     //this.PassengerDetails(user);
     this.router.navigate(['/paymentgateway']); 
  } 

  ngOnInit():void{
    this.len=+sessionStorage.getItem('NoOfTickets')
    this.bid = this.passenger.Getlastbooking().subscribe((data)=>{this.bid = data;console.log(data)})
    this.mail= sessionStorage.getItem('user')
    this.seatno=sessionStorage.getItem('seats')
    console.log(this.seatno)
    this.seat = JSON.parse(this.seatno);
    console.log(this.seat)
   //this.sn=+sessionStorage.getItem('seats[0]')
  // console.log(this.sn)
  }
  AddPassenger(){
    debugger;
        if(this.len==0)
        {
          alert("You have added all the Passenger Details Cannot Add any more") 
        }
        else{
          const index: number = this.seat.indexOf(this.PassengerForm.value.SeatID);
          if (index !== -1) {
            this.seat.splice(index, 1);
          }
          this.PassengerDetails(this.PassengerForm.value)
        }
        
        //console.log(this.PassengerForm.value)
        //this.router.navigate(['/passengerdetails'])  
    }
    

  PassengerDetails(addpass:AddPassenger)    
  {  
    console.log(addpass) 
    debugger; 
  this.passenger.createpassenger(addpass).subscribe(    
    ()=>    
    {    
      this.data = true;    
      //this.massage = 'Data saved Successfully'; 
     // this.router.navigateByUrl('/class-details');
      window.alert("Passenger Added Successfully!!!");
      this.len-=1;
      this.PassengerForm.reset();    
    });    
  } 


}

