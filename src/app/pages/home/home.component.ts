import { Component } from '@angular/core';
import {CompetitionCardComponent} from "../../components/competition-card/competition-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CompetitionCardComponent, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  competitions = [
    {
      id: '1',
      code: 'DEER2024',
      date: '2024-05-15',
      location: 'Northern Quebec',
      max_participants: 50,
      min_participants: 10,
      open_registration: true,
      species_type: 'Deer'
    },
    // Add more competitions...
  ];
}
