import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{LoginService} from '../login.service';

@Component({
  selector: 'app-view-flight',
  templateUrl: './view-flight.component.html',
  styleUrls: ['./view-flight.component.css']
})
export class ViewFlightComponent implements OnInit {
  flightdetails :any=[];

  constructor(private router:Router,private flightservice:LoginService) { }

  //ngOnInit(): void {

    //this.fetchFlight();
  //}
  fetchFlight() {
    debugger;
    this.flightdetails=this.flightservice.getRegisteredUser().subscribe((data)=>
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