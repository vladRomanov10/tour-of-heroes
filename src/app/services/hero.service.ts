import { Injectable, inject } from '@angular/core';

import { HEROES } from "../mock-heroes";
import { Hero } from "../types/interfaces/hero.interface";

import { Observable, of, catchError, map, tap } from "rxjs";

import { MessageService } from "./message.service";

import { HttpClient, HttpHeaders} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly messageService:MessageService = inject(MessageService)
  private readonly http:HttpClient = inject(HttpClient)

  private readonly heroesUrl:string = 'api/heroes'

  getHeroes(): Observable<Hero[]> {
    const heroes$ = this.http.get<Hero[]>(this.heroesUrl)

    this.log('fetched heroes')

    return heroes$
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero (id:number):Observable<Hero> {
    const hero:Hero = HEROES.find((h:Hero) => h.id === id)!

    this.log(`fetched hero id=${id}`)

    return of(hero)
  }

  private log(message: string) {
    this.messageService.add({
      id: this.messageService.addId(),
      value: `HeroService: ${message}`
    })
  }

  private handleError<T>(operation:string = 'operation', result:T) {
    return (error: any): Observable<T> => {
      console.error(error)

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T)
    }
  }
}
