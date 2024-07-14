import { Component, inject } from '@angular/core';
import user from '../types/users';
import { UserService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule,RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
users:user[]=[];
userService = inject(UserService)
ngOnInit(){
this.userService.getUsers().subscribe(result=>{
  this.users = result;
  console.log(this.users);
})
}
delete(id:string){
    const ok = confirm("Are you sureee to dleet the dattta!!!!!!!!!!!!!!!!!!!!!!!!")
    if(ok){
      this.userService.deleteUser(id).subscribe(result=>{
        alert("User Successpully!!!");
        this.users = this.users.filter((u)=>u._id!=id);
      })
    }
}
}
