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
  private readonly httpOptions:object = {
    headers: new HttpHeaders({'Content type':'application/json'})
  }

  getHeroes(): Observable<Hero[]> {
    const heroes$ = this.http.get<Hero[]>(this.heroesUrl)

    return heroes$
      .pipe(
        tap(_=>this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero (id:number):Observable<Hero> {
    const url:string = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id =${id}}`)),
        catchError(this.handleError<Hero>(`getHero id${id}}`))
      )
  }

  updateHero(hero: Hero):Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_=>this.log(`update hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero:Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  deleteHero(id: number):Observable<Hero> {
    const url:string = `${this.heroesUrl}/${id}`

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_=>this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }

  searchHeroes(term:string): Observable<Hero[]> {
    if (!term.trim()) {
      return of ([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
            this.log(`found heroes matching "${term}"`) :
            this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      )
  }

  private log(message: string) {
    this.messageService.add({
      id: this.messageService.addId(),
      value: `HeroService: ${message}`
    })
  }

  private handleError<T>(operation:string = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.error(error)

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T)
    }
  }
}
