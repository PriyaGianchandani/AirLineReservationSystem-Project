import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../confirmed.validator';
import { LoginService } from '../login.service';
import { Register } from '../register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {   
  data = false;    
  UserForm: FormGroup;    
  massage:string;    
  err: string;
  login = false
  user;
  constructor(private formbulider: FormBuilder,private loginService:LoginService,private router:Router) { }   
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
  ngOnInit() {    
    this.UserForm = this.formbulider.group({    
      Title:['',[Validators.required]],
      FirstName: ['', [Validators.required,Validators.pattern("^[a-zA-Z]+$")]],    
      LastName: ['', [Validators.required,Validators.pattern("^[a-zA-Z]+$")]], 
      Password: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9]+$")]],
      ConfirmPassword:['',[Validators.required]],     
      Email: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$")]],    
      Dob:['',[Validators.required]],
      ContactNo: ['', [Validators.required,Validators.minLength(10)]], 
             
    },{validator: ConfirmedValidator('Password', 'ConfirmPassword')});     
  } 
  get Title(){
    return this.UserForm.get("Title");
  }

  get Firstname(){
    return this.UserForm.get("FirstName");
  }

  get Lastname(){
    return this.UserForm.get("LastName");
  }
  get Password(){
    return this.UserForm.get("Password");
  }

  get ConfirmPassword(){
    return this.UserForm.get("ConfirmPassword");
  }

  get Email(){
    return this.UserForm.get("Email");
  }
  get Dob(){
    return this.UserForm.get("Dob");
  }
  get ContactNo(){
    return this.UserForm.get("ContactNo");
  }   
   onFormSubmit()    
  {    
    if(this.UserForm.valid)
     {
       this.err="User " + this.Firstname.value + " registered sucessfully"; 
     }
     else
     {
       this.err="Please Enter all the Details"
     }
     console.log(this.UserForm.value);
    const user = this.UserForm.value;    
    this.Createemployee(user);    
  }    
  Createemployee(register:Register)    
  {    
  this.loginService.CreateUser(register).subscribe(    
    ()=>    
    {    
      this.data = true;    
      this.router.navigateByUrl('/Login');
      window.alert("LOGIN SUCCESSFUL!!!")   
      this.UserForm.reset();    
    });    
  }
}