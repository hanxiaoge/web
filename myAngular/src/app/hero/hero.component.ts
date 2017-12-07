import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {

  constructor(private router: Router,
    private heroService: HeroService) { }
  heroes:Hero[];
  selectedHero: Hero;
  onSelect(hero:Hero):void {

    this.selectedHero=hero;
  }
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes=>this.heroes=heroes);
  }
  toDetail(): void {
     this.router.navigate(['/detail', this.selectedHero.id]);
  }
  ngOnInit(): void{
    this.getHeroes();
  }

}
