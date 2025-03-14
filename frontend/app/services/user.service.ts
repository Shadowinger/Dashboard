import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5500/users'; 

  constructor(private http: HttpClient) {}

  // Načtení uživatelů
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Přidání uživatele
  addUser(name: string, phone: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, phone });
  }

  // Odstranění uživatele
  removeUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}