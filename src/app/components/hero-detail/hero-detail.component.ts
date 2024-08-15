import { Component, Input } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";
import {Hero} from "../../types/interfaces/hero.interface";

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

  @Input() hero?: Hero

}
