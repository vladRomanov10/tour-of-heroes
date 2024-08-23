import {Component, inject, OnInit} from '@angular/core';
import {Hero} from "../../types/interfaces/hero.interface";
import {UpperCasePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroService} from "../../services/hero.service";
import {Observable, Subscription} from "rxjs";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
    HeroDetailComponent,
    RouterLink,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {

  private readonly heroService:HeroService = inject(HeroService)

  public heroes:Hero[] = []

  ngOnInit(): void {
    this.getHeroes()
  }

  add(name: string):void {
    name = name.trim()
    if (!name) {return}
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero)
      })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h: Hero) => h !== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }

  private getHeroes(): void {
    const heroes$:Observable<Hero[]> = this.heroService.getHeroes()
    const heroesSubs:Subscription = heroes$.subscribe((heroes:Hero[]) => this.heroes = heroes)
  }
}
