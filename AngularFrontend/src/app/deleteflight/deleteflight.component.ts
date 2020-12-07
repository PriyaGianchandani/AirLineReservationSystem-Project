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
   
     
  ngOnInit(): void {

    this.GetFlight();
  }

}
