import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seatsselect',
  templateUrl: './seatsselect.component.html',
  styleUrls: ['./seatsselect.component.css']
})
export class SeatsselectComponent implements OnInit {
  myForm: FormGroup;
  sn=[];
  i=0;
  login=false;
  user: string;
 
  constructor(private fb: FormBuilder,private router:Router){ }
  ngOnInit() {
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });
   
} 
onCheckboxChange(e,value) {
  const website: FormArray = this.myForm.get('website') as FormArray;

  if (e.target.checked) {
    console.log(value);
    this.sn.push(value);
   
  } else {
    const index: number = this.sn.indexOf(value);
    if (index !== -1) {
        this.sn.splice(index, 1);
    }  

  }
  console.log(this.sn);
}
    
seat()

{
  var seats=this.sn
  sessionStorage.setItem('seats',JSON.stringify(this.sn));
  console.log(seats.length)
  var b=Number(sessionStorage.getItem('NoOfTickets'))
  if(seats.length<b||seats.length>b)
  {
    alert('Please Select Correct No of seats')
  }
  else{
      this.router.navigate(['/bookingdetails']);
  }
}


submit(){
  console.log(this.myForm.value);
  this.router.navigate(['/bookingdetails'])
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
}