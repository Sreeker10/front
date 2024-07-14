import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import user from '../../types/users';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  formBuild = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  userForm: FormGroup = this.formBuild.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    address: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  editUserId!: string;

  ngOnInit(): void {
    this.editUserId = this.route.snapshot.params['id'];
    if (this.editUserId) {
      this.userService.getUser(this.editUserId).subscribe(result => {
        this.userForm.patchValue(result);
      });
    }
  }

  addUser(): void {
    if (this.userForm.invalid) {
      alert('Please provide correct information.');
      return;
    }
    const model: user = this.userForm.value;
    this.userService.addUser(model).subscribe(() => {
      alert('User added successfully');
      this.router.navigateByUrl('/');
    });
  }

  updateUser(): void {
    if (this.userForm.invalid) {
      alert('Please provide correct information.');
      return;
    }
    const model: user = this.userForm.value;
    this.userService.updateUser(this.editUserId, model).subscribe(() => {
      alert('User updated successfully');
      this.router.navigateByUrl('/');
    });
  }
}
