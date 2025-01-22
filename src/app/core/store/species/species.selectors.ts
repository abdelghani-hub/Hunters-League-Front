// src/app/core/store/species/species.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpeciesState } from './species.reducer';

export const selectSpeciesState = createFeatureSelector<SpeciesState>('SpeciesState');

export const selectSpeciesPage = createSelector(
  selectSpeciesState,
  (state: SpeciesState) => state.pageSpecies
);

export const selectSpeciesLoading = createSelector(
  selectSpeciesState,
  (state: SpeciesState) => state.loading
);

export const selectSpeciesError = createSelector(
  selectSpeciesState,
  (state: SpeciesState) => state.error
);
