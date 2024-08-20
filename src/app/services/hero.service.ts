import { Injectable, inject } from '@angular/core';
import { HEROES } from "../mock-heroes";
import { Hero } from "../types/interfaces/hero.interface";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly messageService:MessageService = inject(MessageService)

  getHeroes(): Observable<Hero[]> {
    const heroes$:Observable<Hero[]> = of(HEROES)
    this.messageService.add(
      {
        id: this.messageService.addId(),
        value: 'HeroService: fetched heroes'
      })

    return heroes$
  }

  getHero (id:number):Observable<Hero> {
    const hero:Hero = HEROES.find((h:Hero) => h.id === id)!

    this.messageService.add({
      id: this.messageService.addId(),
      value: `HeroService: fetched hero id=${id}`})

    return of(hero)
  }
}
