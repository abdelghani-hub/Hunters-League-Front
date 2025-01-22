import { createReducer, on } from '@ngrx/store';
import { loadSpecies, loadSpeciesSuccess, loadSpeciesFailure } from './species.actions';
import Species from "../../../types/Species";
import {PageableResponse} from "../../models/pagination.types";

export interface SpeciesState {
  pageSpecies: PageableResponse<Species>;
  loading: boolean;
  error: any;
}

export const initialState: SpeciesState = {
  pageSpecies: {
    content: [],
    page: {
      size: 0,
      number: 0,
      totalElements: 0,
      totalPages: 0
    }
  },
  loading: false,
  error: null
};

export const speciesReducer = createReducer(
  initialState,
  on(loadSpecies, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadSpeciesSuccess, (state, { pageSpecies }) => ({
    ...state,
    pageSpecies,
    loading: false
  })),
  on(loadSpeciesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
