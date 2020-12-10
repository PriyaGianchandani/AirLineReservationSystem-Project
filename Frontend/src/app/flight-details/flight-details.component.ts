import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  flightdetails:any=[];
  constructor(private router:Router,private flightService:LoginService) { }

  //ngOnInit(): void {

    //this.fetchFlight();
  //}
  fetchFlight() {
    debugger;
    this.flightdetails=this.flightService.getFlightDetails().subscribe((data)=>
    {this.flightdetails=data;console.log(data)})
    console.log(this.flightdetails);
  }
  title = 'FlightReservation';
  login = false
  user

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
      this.router.navigate(['/home'])
    }
    else
    {
      this.fetchFlight();
    }
  }
}
