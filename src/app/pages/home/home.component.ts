import {Component, inject, OnInit} from '@angular/core';
// @ts-ignore
import {Competition, CompetitionCardComponent} from "../../components/competition-card/competition-card.component";
import {NgForOf} from "@angular/common";
import {CompetitionService} from "../../core/services/competition.service";
import {PageRequest} from "../../core/models/pagination.types";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CompetitionCardComponent, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private competitionService = inject(CompetitionService);
  competitions: Competition[] = [];

  ngOnInit(): void {
    let pageRequest: PageRequest = {
      page: 0,
      size: 6,
    }
    this.competitionService.getPageCompetition(pageRequest)
      .subscribe(res => {
        this.competitions = res;
      });
  }
}
