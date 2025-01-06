import { Component, OnInit } from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import Species from "../../../types/Species";
import {SpeciesService} from "../../../core/services/species.service";
import {switchAll} from "rxjs";

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    UpperCasePipe,
    NgClass
  ],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent implements OnInit {
  public species: Species[] = [];
  public currentPage = 0;
  public pageSize = 8;
  public totalElements = 0;
  public totalPages = 0;
  public loading = false;

  constructor(private speciesService: SpeciesService) {}

  ngOnInit(): void {
    this.initializePage();
  }

  private initializePage(): void {
    this.loading = true;
    this.speciesService.getPage({
      page: this.currentPage,
      size: this.pageSize,
      sort: 'name,asc'
    }).subscribe({
      next: (response) => {
        this.species = response.content;
        this.totalElements = response.page.totalElements;
        this.totalPages = response.page.totalPages;
        this.currentPage = response.page.number;
        this.pageSize = response.page.size;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading species:', error);
        this.loading = false;
      }
    });
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this.initializePage();
  }

  public onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 0; // Reset to first page
    this.initializePage();
  }

  protected readonly switchAll = switchAll;
}
