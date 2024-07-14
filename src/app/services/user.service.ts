import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import user from '../types/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3000';
  httpClient = inject(HttpClient);

  getUsers() {
    return this.httpClient.get<user[]>(`${this.apiUrl}/users`);
  }

  getUser(id: string) {
    return this.httpClient.get<user>(`${this.apiUrl}/users/${id}`);
  }

  addUser(model: user) {
    return this.httpClient.post(`${this.apiUrl}/users`, model);
  }

  updateUser(id: string, model: user) {
    return this.httpClient.put(`${this.apiUrl}/users/${id}`, model);
  }
  deleteUser(id:string){
    return this.httpClient.delete(`${this.apiUrl}/users/${id}`);
  }
}
