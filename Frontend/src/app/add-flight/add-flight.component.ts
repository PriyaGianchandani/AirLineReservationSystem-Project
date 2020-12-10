import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddFlight } from '../add-flight';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  AddFlightForm:FormGroup
  Error;
  title = 'FlightReservation';
  login = false
  user
  data=false
  date = new Date;

  constructor(private router:Router,private loginService:LoginService) {
    this.AddFlightForm=new FormGroup({
      SourceFlight:new FormControl(null,[Validators.required]),
      Destination:new FormControl(null,[Validators.required]),
      Duration:new FormControl(null,[Validators.required]),
      DepartureTime:new FormControl(null,[Validators.required]),
      ArrivalTime:new FormControl(null,[Validators.required]),
      NoOfSeats:new FormControl(null,[Validators.required]),
      FlightDate:new FormControl(null,[Validators.required])
   })
  }

  get SourceFlight(){
    return this.AddFlightForm.get("SourceFlight");
  }

  get Destination(){
    return this.AddFlightForm.get("Destination");
  }
  get Duration(){
    return this.AddFlightForm.get("Duration");
  }

  get DepartureTime(){
    return this.AddFlightForm.get("DepartureTime");
  }

  get ArrivalTime(){
    return this.AddFlightForm.get("ArrivalTime");
  }

  get FlightDate(){
    return this.AddFlightForm.get("FlightDate");
  }
 

  get NoOfSeats(){
    return this.AddFlightForm.get("NoOfSeats");
  }

  onFormSubmit()    
  {    
    if(this.AddFlightForm.valid)
     {
       this.Error="Flight Added sucessfully"; 
     }
     else
     {
       this.Error="Please Enter all the Details"
     }
     console.log(this.AddFlightForm.value);
    const flight = this.AddFlightForm.value;    
    this.AddFlight(flight); 
    sessionStorage.setItem('NoOfSeats',this.NoOfSeats.value)
    this.loginService.setNoOfSeats(this.NoOfSeats)


  }    

  AddFlight(addflight:AddFlight)    
  {    
  this.loginService.createflight(addflight).subscribe(    
    ()=>    
    {    
      this.data = true;    
      //this.massage = 'Data saved Successfully'; 
      this.router.navigateByUrl('/class-details');
      window.alert("Flight Added SUCCESSFULLY!!!");
      this.AddFlightForm.reset();    
    });    
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

  ngOnInit():void{
    if(!sessionStorage.getItem('user')){
      this.router.navigate(['/admin-home'])
    }

    
  }

}