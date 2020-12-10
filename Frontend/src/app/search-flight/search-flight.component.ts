import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  date = new Date;
  a: number;
  constructor(private searchdataService:LoginService,private router:Router) { }  
  model : any={};    
  flight:any=[]; 
  title = 'FlightReservation';
  login = false
  user  
  flightdetails:any;

  searchdata() {  
   debugger;  
    this.searchdataService.searchdata(this.model).subscribe((res: any) => {  
        this.flight=res; 
        console.log(res);  
        console.log(this.flight);   
    })  
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

  btnDisplayDetails(FlightID:number){
    
    this.flightdetails=this.searchdataService.GetFlightById(FlightID).subscribe((data)=>
    {sessionStorage.setItem('FlightID',data);
  })
    //sessionStorage.setItem('FlightID',this.flightdetails.value);
    if(this.login)
    {
      this.router.navigate(['/displaydetails']);
    }
    else{
      this.router.navigate(['/Login']);
      window.alert("Please Login!!")
    }
    
  }

  ngOnInit():void{

   
  }  
}