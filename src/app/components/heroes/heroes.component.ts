import { Component } from '@angular/core';
import {Hero} from "../../types/interfaces/hero.interface";
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {
  readonly hero: Hero = {
    id: 1,
    name: 'Windstorm'
  }
}
