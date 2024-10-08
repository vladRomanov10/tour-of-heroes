import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {HeroesComponent} from "./components/heroes/heroes.component";
import {MessagesComponent} from "./components/messages/messages.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroesComponent, MessagesComponent, RouterLink,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly title:string = 'Tour of Heroes';
}
