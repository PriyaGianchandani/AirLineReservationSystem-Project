import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private router:Router){
    this.PassengerForm=new FormGroup({
      PassengerID :new FormControl(null,[Validators.required]),
      FirstName :new FormControl(null,[Validators.required]),
      LastName:new FormControl(null,[Validators.required]),
      Age:new FormControl(null,[Validators.required]),
      BookingID :new FormControl(null,[Validators.required]),
      Email:new FormControl(null,[Validators.required]),
     
      })
  }

  get PassengerID()
  {
    return this.PassengerForm.get("PassengerID");
  }

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
    const user = this.PassengerForm.value;    
    
  } 

  ngOnInit():void{
   
  }

}
