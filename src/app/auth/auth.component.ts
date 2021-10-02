import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  public login = this.formB.group({
    email: ['', [Validators.required]],
    contrasena: ['', [Validators.required]],
  });

  constructor(private router:Router,
              private formB: FormBuilder,
              private auth:AngularFireAuthModule) { }

  ngOnInit(): void {
  }
  onClick(){



    console.log(this.login.value);

    //this.router.navigate(['/inicio']);
  }

}
