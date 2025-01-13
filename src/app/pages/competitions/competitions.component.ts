import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import Competition from "../../types/Competition";
import {CompetitionService} from "../../core/services/competition.service";
import {CompetitionCardComponent} from "../../components/competition-card/competition-card.component";
import {TableLoaderComponent} from "../../components/table-loader/table-loader.component";
import {PaginationComponent} from "../../components/pagination/pagination.component";

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [
    NgClass,
    CompetitionCardComponent,
    NgForOf,
    NgIf,
    TableLoaderComponent,
    PaginationComponent
  ],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})
export class CompetitionsComponent implements OnInit {
  public competitions: Competition[] = [];
  public currentPage = 1;
  public pageSize = 6;
  public totalElements = 0;
  public totalPages = 0;
  public speciesType = 'BIG_GAME';
  public loading = false;

  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.initializePage();
  }

  private initializePage(): void {
    this.loading = true;
    this.competitionService.getPageByType(this.speciesType,{
      page: this.currentPage,
      size: this.pageSize,
      sort: 'date,desc'
    }).subscribe({
      next: (response) => {
        this.competitions = response.content;
        this.totalElements = response.page.totalElements;
        this.totalPages = response.page.totalPages;
        this.currentPage = response.page.number;
        this.pageSize = response.page.size;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  public onPageChange(page: number): void {
    this.competitions = [];
    this.currentPage = page;
    this.initializePage();
  }

  public onPageSizeChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.pageSize = +selectedValue;
    this.competitions = [];
    this.currentPage = 0;
    this.initializePage();
  }

  changeType(type: string) {
    if (type === this.speciesType) {
      return;
    }

    this.speciesType = type;
    this.competitions = [];
    this.initializePage();
  }
}
