import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import Competition from "../../../types/Competition";
import {CompetitionService} from "../../../core/services/competition.service";
import {PaginationComponent} from "../../../components/pagination/pagination.component";
import {FormsModule} from "@angular/forms";
import {TableLoaderComponent} from "../../../components/table-loader/table-loader.component";
import {CompetitionCreateComponent} from "./competition-create/competition-create.component";
import {RouterLink} from "@angular/router";
import {CreateBtnComponent} from "../../../components/create-btn/create-btn.component";

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    PaginationComponent,
    FormsModule,
    TableLoaderComponent,
    RouterLink,
    CreateBtnComponent,
  ],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})

export class CompetitionsComponent implements OnInit {
  public competitions: Competition[] = [];
  public currentPage = 0;
  public pageSize = 10;
  public totalElements = 0;
  public totalPages = 0;
  public loading = false;

  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.initializePage();
  }

  private initializePage(): void {
    this.loading = true;
    this.competitionService.getPage({
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
      error: (error) => {
        console.error('Error loading competitions:', error);
        this.loading = false;
      }
    });
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this.initializePage();
  }

  public onPageSizeChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.pageSize = +selectedValue;
    this.currentPage = 0;
    this.initializePage();
  }
}
