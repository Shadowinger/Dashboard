import { Component, OnInit } from '@angular/core';

@Component({
  standalone:true,  
  selector: 'app-date-display',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateDisplayComponent implements OnInit {
  formattedDate: string = '';

  ngOnInit() {
    this.updateDate();
  }

  updateDate() {
    // Create a new Date object for the current time in the Czech Republic
    const date = new Date();
    
    // Define Czech day names
    const czechDays = [
      'neděle', 'pondělí', 'úterý', 'středa', 
      'čtvrtek', 'pátek', 'sobota'
    ];

    // Get day and month with leading zeros
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const dayName = czechDays[date.getDay()];

    // Format: DD.MM.YYYY den
    this.formattedDate = `${day}.${month}.${year}, ${dayName}`;
  }
}