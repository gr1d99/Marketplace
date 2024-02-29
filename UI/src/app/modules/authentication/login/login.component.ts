import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FormService} from "../../../services/shared/form.service";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../../shared/constanst";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  form = this.formBuilder.group({
    email: ['user@example.com', [Validators.email, Validators.required]],
    password: ['string', [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder,
              private formService: FormService,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }



  submit() {
    const { valid } = this.form;

    if (!valid) {
      return this.formService.markFieldsInvalid(this.form)
    }

    const data: { email: string, password: string } = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    this.authenticationService.authenticate(data)
  }

  redirectToSignup() {
    this.router.navigate([APP_ROUTES.signup])
  }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        return;
      }

      // redirect to appropriate page
      this.router.navigate([APP_ROUTES.index])
    })
  }
}
