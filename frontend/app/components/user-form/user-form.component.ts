import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,  
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  savedData: { labels: string[]; values: number[] } | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSavedData();
  }

  loadSavedData(): void {
    this.http.get<{ Saved: { labels: string[]; values: number[] } }>('/assets/data.json')
      .subscribe(response => {
        if (response?.Saved) {
          this.savedData = response.Saved;
        }
        console.log(this.savedData);
      });
  }
}
