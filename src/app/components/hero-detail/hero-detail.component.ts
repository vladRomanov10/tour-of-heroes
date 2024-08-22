import { Component, Input, inject } from '@angular/core';

import {FormsModule} from "@angular/forms";

import {UpperCasePipe, Location } from "@angular/common";

import { ActivatedRoute } from "@angular/router";

import { HeroService } from "../../services/hero.service";
import { Hero } from "../../types/interfaces/hero.interface";

import { Observable, Subscription } from "rxjs";


@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    FormsModule,
    UpperCasePipe
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent {

  private readonly route: ActivatedRoute = inject(ActivatedRoute)
  private readonly heroService: HeroService = inject(HeroService)
  private readonly location: Location = inject(Location)

  public hero?:Hero

  ngOnInit():void {
    this.getHero()
  }

  goBack():void {
    this.location.back()
  }

  save():void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }

  private getHero():void {
    const id:number = Number(this.route.snapshot.paramMap.get('id'))

    const hero$:Observable<Hero> = this.heroService.getHero(id)
    const heroSubs:Subscription = hero$.subscribe(hero => this.hero = hero)
  }

}
