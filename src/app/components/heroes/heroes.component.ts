import { Component } from '@angular/core';
import {Hero} from "../../types/interfaces/hero.interface";
import {UpperCasePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule
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
