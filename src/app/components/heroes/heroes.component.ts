import {Component, inject} from '@angular/core';
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
export class HeroesComponent {

  private readonly heroService:HeroService = inject(HeroService)

  public heroes:Hero[] = []

  ngOnInit(): void {
    this.getHeroes()
  }

  private getHeroes(): void {
    const heroes$:Observable<Hero[]> = this.heroService.getHeroes()
    const heroesSubs:Subscription = heroes$.subscribe((heroes:Hero[]) => this.heroes = heroes)
  }
}
