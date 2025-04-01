import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,  
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  // Holds the saved data with labels and values
  savedData: { labels: string[]; values: number[] } | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Load previously saved data when the component initializes
    this.loadSavedData();
  }

  // Method to load saved data from a JSON file
  loadSavedData(): void {
    this.http.get<{ Saved: { labels: string[]; values: number[] } }>('/assets/data.json')
      .subscribe(response => {
        // Check if the response contains saved data
        if (response?.Saved) {
          this.savedData = response.Saved;
        }
        // Log the saved data for debugging purposes
        console.log(this.savedData);
      });
  }
}
