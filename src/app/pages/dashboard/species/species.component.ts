import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import Species from "../../../types/Species";
import {PaginationComponent} from "../../../components/pagination/pagination.component";
import {TableLoaderComponent} from "../../../components/table-loader/table-loader.component";
import {FormsModule} from "@angular/forms";
import {CreateBtnComponent} from "../../../components/create-btn/create-btn.component";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {
  selectSpeciesError,
  selectSpeciesLoading,
  selectSpeciesPage,
} from "../../../core/store/species/species.selectors";
import {PageableResponse} from "../../../core/services/http.service";
import {loadSpecies} from "../../../core/store/species/species.actions";

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    PaginationComponent,
    TableLoaderComponent,
    FormsModule,
    CreateBtnComponent,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent implements OnInit {
  species$: Observable<PageableResponse<Species>>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  public currentPage = 0;
  public pageSize = 10;

  constructor(private store: Store) {
    this.species$ = this.store.select(selectSpeciesPage);
    this.loading$ = this.store.select(selectSpeciesLoading);
    this.error$ = this.store.select(selectSpeciesError);
  }

  ngOnInit(): void {
    this.loadSpeciesPage();
  }

  private loadSpeciesPage(): void {
    this.store.dispatch(loadSpecies({ page: this.currentPage, size: this.pageSize, sort: 'name,asc' }));
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this.loadSpeciesPage();
  }

  public onPageSizeChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.pageSize = +selectedValue;
    this.currentPage = 0;
    this.loadSpeciesPage();
  }
}
