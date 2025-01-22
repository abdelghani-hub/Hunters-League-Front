import { createAction, props } from '@ngrx/store';
import Species from "../../../types/Species";
import {PageableResponse} from "../../models/pagination.types";


export const loadSpecies = createAction('[Species] Load Species', props<{ page: number, size: number, sort: string }>());
export const loadSpeciesSuccess = createAction('[Species] Load Species Success', props<{ pageSpecies: PageableResponse<Species> }>());
export const loadSpeciesFailure = createAction('[Species] Load Species Failure', props<{ error: any }>());
