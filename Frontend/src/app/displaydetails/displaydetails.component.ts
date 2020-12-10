import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-displaydetails',
  templateUrl: './displaydetails.component.html',
  styleUrls: ['./displaydetails.component.css']
})
export class DisplaydetailsComponent implements OnInit {

  DisplayDetails:FormGroup
  login = false
  err
  user
  a
  EconomyCost: any;
  Economy=false;
  NumberOftickets
  BusinessCost: any;

  constructor(private router:Router,private loginService:LoginService) {
    this.DisplayDetails=new FormGroup({
      NoOfTickets :new FormControl(null,[Validators.required]),
      SelectClass :new FormControl(null,[Validators.required]),
      Cost:new FormControl(null,[Validators.required]),
      TotalCost:new FormControl(null,[Validators.required]),

     
      })
   }

   get NoOfTickets()
   {
     return this.DisplayDetails.get("NoOfTickets");
     
     
   }


   get SelectClass()
   {
     return this.DisplayDetails.get("SelectClass");
   }

   get Cost()
   {
     return this.DisplayDetails.get("Cost");
   }

   get TotalCost()
   {
     return this.DisplayDetails.get("TotalCost");
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

  ngOnInit(): void {
  }

  btnClick(){
    sessionStorage.clear();
    this.router.navigate(['/search-flight']);
}

onFormSubmit(){
  this.router.navigate(['/seatsselect']);
  sessionStorage.setItem('NoOfTickets',this.NoOfTickets.value);
  if(sessionStorage.getItem('ClassDetails') =="EconomyClass")
  {
    sessionStorage.setItem('TotalCost',this.TotalCost.value)
  }
  else
  {
    sessionStorage.setItem('TotalCost',this.TotalCost.value)
  }
}

SetNoOfTickets(){
  sessionStorage.setItem('NoOfTickets',this.NoOfTickets.value);
  sessionStorage.setItem('ClassDetails',this.SelectClass.value);
  this.router.navigate(['displaydetails']);
  if(sessionStorage.getItem('ClassDetails')=="Economy Class")
  {
    this.Economy=true;
    this.btnDisplayDetails(+sessionStorage.getItem('FlightID'));
    this.NumberOftickets=+sessionStorage.getItem('NoOfTickets')

  }
  else{
    this.Economy=false;
    this.btnDisplayDetails1(+sessionStorage.getItem('FlightID'))
    this.NumberOftickets=sessionStorage.getItem('NoOfTickets')
  }
}

btnDisplayDetails(FlightID:number){
    
  this.EconomyCost=this.loginService.GetEconomyCostById(FlightID).subscribe((data)=>
  {this.EconomyCost=data;console.log(data);
})
  this.router.navigate(['/displaydetails']);
  //sessionStorage.setItem('FlightID',this.flightdetails.value);
}

btnDisplayDetails1(FlightID:number){
    
  this.BusinessCost=this.loginService.GetBusinessCostById(FlightID).subscribe((data)=>
  {this.BusinessCost=data;console.log(data);
})
  this.router.navigate(['/displaydetails']);
  //sessionStorage.setItem('FlightID',this.flightdetails.value);
}
}
