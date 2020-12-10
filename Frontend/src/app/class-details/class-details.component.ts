import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddClass } from '../add-class';
import { LoginService } from '../login.service';
import {AddFlightComponent} from '../add-flight/add-flight.component'


@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  ClassForm:FormGroup
  model : any={};
  login = false
  user
  data=false
  err:string;
  No
  NoOfSeatss: Number;
  a:Number;
  b:Number;
  //c:Number;
  //d:Number;
  myseats:Number;
  
    
  
  constructor(private router:Router,private classdetails:LoginService) { 
    this.ClassForm=new FormGroup({
    ClassID :new FormControl(null,[Validators.required]),
    BusinessCost :new FormControl(null,[Validators.required]),
    NoOfBusinessSeats:new FormControl(null,[Validators.required]),
    FlightID:new FormControl(null,[Validators.required]),
    EconomyCost :new FormControl(null,[Validators.required]),
    NoOfEconomySeats:new FormControl(null,[Validators.required]),
   
    })
  }

  get ClassID()
   {
     return this.ClassForm.get("ClassID");
   }

   get BusinessCost()
   {
     return this.ClassForm.get("BusinessCost");
   }

   get NoOfBusinessSeats()
   {
     return this.ClassForm.get("NoOfBusinessSeats");
   }
   get FlightID()
   {
     return this.ClassForm.get("FlightID").setValue(this.lastflightid);
   }
   get EconomyCost()
   {
     return this.ClassForm.get("EconomyCost"); 
   }
   //addflight.NoOfSeats()
   get NoOfEconomySeats()
   {
     return this.ClassForm.get("NoOfEconomySeats");
   }
   lastflightid :any=[];
   fetchFlight() {
    //debugger;
    this.lastflightid=this.classdetails.GetlastFlight().subscribe((data)=>
    {this.lastflightid=data;console.log(data)})
    console.log(this.lastflightid);
  }
   ngDoCheck(){
    if(sessionStorage.getItem('user')){
      this.login=true
      this.user=sessionStorage.getItem('user')
    }else{
      this.login=false
      this.user=""
    }
    if (sessionStorage.getItem('NoOfSeats'))
    {
      this.NoOfSeatss=+sessionStorage.getItem('NoOfSeats');
    }
    else{
      this.NoOfSeatss=0;

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
    debugger;
    this.a=+this.NoOfEconomySeats.value;
    this.b=+this.NoOfBusinessSeats.value;
    sessionStorage.setItem('NoOfEconomySeats',this.NoOfEconomySeats.value)
    sessionStorage.setItem('NoOfBusinessSeats',this.NoOfBusinessSeats.value)
    

    if((+this.a + +this.b) != this.NoOfSeatss)    
    {
      this.err="Please Enter Correct no of seats"

    }
    else
    {
      if(this.ClassForm.valid)
     {
       this.err="Classregistered sucessfully"; 
       const user = this.ClassForm.value;    
       console.log(user); 
      this.CreateClass(user);   
     }
     else
     {
       this.err="Please Enter all the Details"
     }

    }
    console.log(this.ClassForm.value); 
  } 

  CreateClass(addclass:AddClass)    
  {    
  this.classdetails.createclass(addclass).subscribe(    
    ()=>    
    {    
      this.data = true;    
      //this.massage = 'Data saved Successfully'; 
      this.router.navigateByUrl('/class-details');
      window.alert("Class Added Successfully");
      this.ClassForm.reset();    
    });    
  } 
  ngOnInit():void{
    this.myseats=this.classdetails.getNoOfSeats()
    this.fetchFlight();
    }
  }