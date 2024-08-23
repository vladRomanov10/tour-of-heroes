import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {debounceTime,distinctUntilChanged, switchMap, Observable, Subject} from "rxjs";
import {Hero} from "../../types/interfaces/hero.interface";
import {HeroService} from "../../services/hero.service";

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss'
})
export class HeroSearchComponent implements OnInit {
  private readonly heroService:HeroService = inject(HeroService)

  public heroes$!: Observable<Hero[]>

  private searchTerms:Subject<string> = new Subject<string>()

  ngOnInit():void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term:string) => this.heroService.searchHeroes(term))
    )
  }

  search(term:string):void {
    this.searchTerms.next(term)
  }
}
