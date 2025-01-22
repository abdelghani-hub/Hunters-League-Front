import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SpeciesService } from '../../services/species.service';
import { loadSpecies, loadSpeciesSuccess, loadSpeciesFailure } from './species.actions';

@Injectable()
export class SpeciesEffects {
  loadSpecies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSpecies),
      mergeMap((action) =>
        this.speciesService.getPage({
            page: action.page,
            size: action.size,
            sort: action.sort
        }).pipe(
          map(species => loadSpeciesSuccess({ pageSpecies: species })),
          catchError(error => of(loadSpeciesFailure({ error })))
        )
      ),
    )
  );

  constructor(private actions$: Actions, private speciesService: SpeciesService) {}
}
