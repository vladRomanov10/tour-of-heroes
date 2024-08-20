import { Component, inject } from '@angular/core';
import {Hero} from "../../types/interfaces/hero.interface";
import {HeroService} from "../../services/hero.service";
import {Observable, Subscription} from "rxjs";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private readonly heroService:HeroService = inject(HeroService)

  public heroes: Hero[] = []

  ngOnInit():void {
    this.getHeroes()
  }

  private getHeroes():void {
    const heroes$:Observable<Hero[]> = this.heroService.getHeroes()

    const heroesSubs:Subscription = heroes$.subscribe((heroes:Hero[]) => this.heroes = heroes.slice(1, 5))
  }
}
