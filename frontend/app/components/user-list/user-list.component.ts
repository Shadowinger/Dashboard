import { Component, OnInit } from "@angular/core";
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Pole uživatelů
  newUser = { name: "", phone: "" }; // Nový uživatel
  showPopup = false; // Stav popup okna

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(); // Načtení uživatelů při spuštění komponenty
    console.log("UserListComponent byl inicializován!");
  }

  // Načtení uživatelů z backendu
  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      console.log("nacteni", data);  
      this.users = data;
    });
  }

  // Přidání uživatele
  addUser() {
    if (!this.newUser.name || !this.newUser.phone) return;

    this.userService.addUser(this.newUser.name, this.newUser.phone).subscribe(() => {
      this.loadUsers();
      this.newUser = { name: "", phone: "" };
      this.showPopup = false; // Zavře popup po přidání uživatele
    });
  }

  // Odstranění uživatele
  removeUser(id: number) {
    this.userService.removeUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  // Otevření popupu
  openPopup() {
    this.showPopup = true;
  }

  // Zavření popupu
  closePopup() {
    this.showPopup = false;
  }
}