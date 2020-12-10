import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddFlight } from '../add-flight';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-deleteflight',
  templateUrl: './deleteflight.component.html',
  styleUrls: ['./deleteflight.component.css']
})
export class DeleteflightComponent implements OnInit {
  allFlights: any=[] ;
  dataSaved = false;  
  massage: string;
  login = false
  user
  err:any;
  router: any;
   
  constructor(private LoginService:LoginService) { }

  GetFlight() {  
    this.allFlights=this.LoginService.getFlight().subscribe((data)=>
    {this.allFlights=data;console.log(data)})  
   } 
   
   DeleteStudent(FlightId: number) {  
    if (confirm("Are You Sure To Delete this Informations")) {  
     this.LoginService.DeleteFlight(FlightId).subscribe(  
      () => {  
       this.dataSaved = true;  
       this.massage = "Deleted Successfully";  
       this.GetFlight();  
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

     
  ngOnInit(): void {

    this.GetFlight();
  }

}