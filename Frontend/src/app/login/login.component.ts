import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  model : any={};    
  title = 'FlightReservation';
  login = false
  user
    
  errorMessage:string;    
  constructor(private router:Router,private LoginService:LoginService) {
    this.loginForm=new FormGroup({
      username:new FormControl(null,[Validators.required,Validators.minLength(5)]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
   }    
   get username()
   {
     return this.loginForm.get("username");
   }
   get password()
   {
     return this.loginForm.get("password");
   }
   sendDetails(email:string,password:string){
     if(email=="admin"&&password=="admin123")
     {
      sessionStorage.setItem('user',this.username.value)
      this.router.navigate(['/admin-home'])
     }
     else
     {
      this.LoginService.login(email,password).subscribe(
        data=>
        {
          if(data =="Wrong Password")
          {
             this.errorMessage="Wrong Password";
          }
          else if(data =="Invalid User")
          {
             this.errorMessage="Invalid User";
          }
          else if(data=="Success")
          {
            this.errorMessage = "Success";
            //this.loginForm.reset();
            this.router.navigateByUrl('/home');
            window.alert("LOGIN SUCCESSFUL!!!")
            console.log(this.loginForm.value);
            sessionStorage.setItem('user',this.loginForm.value.username)
          }
        }
      );
     }
  }
  Login(){
    if(this.loginForm.valid){
      this.sendDetails(this.loginForm.value.username,this.loginForm.value.password)
    }else{
      alert("error")
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

  btnClick(){
    this.router.navigate(['/forgotpassword']);
}

  ngOnInit():void{
  }

}


  /*login(){
    if(this.username.value=="nisarg" && this.password.value=="123456789"){
      sessionStorage.setItem('user',this.username.value)
      this.router.navigate(['/Home'])
    }
    else{
      this.Error="Please Enter Proper Credentials."
    }
  }

  ngOnInit(): void {
  }*/