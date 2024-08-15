import { Component } from '@angular/core';
import {Hero} from "../../types/interfaces/hero.interface";
import {UpperCasePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HEROES} from "../../mock-heroes";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";

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

  readonly heroes:Hero[] = HEROES

  selectedHero?: Hero

  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }
}
