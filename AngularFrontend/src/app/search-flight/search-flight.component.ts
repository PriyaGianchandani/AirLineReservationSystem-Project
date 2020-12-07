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
  constructor(private searchdataService:LoginService,private router:Router) { }  
  model : any={};    
  flight:any; 
  title = 'FlightReservation';
  login = false
  user  

  searchdata() {  
   debugger;  
    this.searchdataService.searchdata(this.model).subscribe((res: any) => {  
            
        this.flight=res;   
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

  ngOnInit():void{
   
  }  
}