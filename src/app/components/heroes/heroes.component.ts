import {Component, inject} from '@angular/core';
import {Hero} from "../../types/interfaces/hero.interface";
import {UpperCasePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HEROES} from "../../mock-heroes";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroService} from "../../services/hero.service";
import {Observable, Subscription} from "rxjs";
import { MessageService} from "../../services/message.service";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
    HeroDetailComponent,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {

  private readonly heroService:HeroService = inject(HeroService)
  private readonly messageService:MessageService = inject(MessageService)

  public selectedHero?: Hero

  public heroes:Hero[] = []

  ngOnInit(): void {
    this.getHeroes()
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero
    this.messageService.add(
      {
        id: Math.floor(Math.random() * 101),
        value: `HeroesComponent: Selected hero id=${hero.id}`
      })
  }

  private getHeroes(): void {
    const heroes$:Observable<Hero[]> = this.heroService.getHeroes()
    const heroesSubscribe:Subscription = heroes$.subscribe((heroes:Hero[]) => this.heroes = heroes)
  }
}
