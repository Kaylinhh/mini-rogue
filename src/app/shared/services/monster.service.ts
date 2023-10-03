import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';
import { Boss } from 'src/app/models/boss.model';
import { Monster } from 'src/app/models/monster.model';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  monster: Observable<Monster[]> = this.http.get<Monster[]>("/assets/json/monsters.json");
  private _monstersByZoneSubject$: BehaviorSubject<Monster[]> = new BehaviorSubject<Monster[]>([]);
  private _bossesByZoneSubject$: BehaviorSubject<Boss[]> = new BehaviorSubject<Boss[]>([]);

  constructor(private http: HttpClient) { }


  getMonstersByZone$(zone: number): Observable<Monster[]> {
    return this.monster.pipe(
      map((monsters: Monster[]) => monsters.filter(monster => monster.zoneNumber === zone)),
      map((filteredMonsters: Monster[]) => {
        const randomIndex = Math.floor(Math.random() * filteredMonsters.length);
        console.log(randomIndex, filteredMonsters);
        return [filteredMonsters[randomIndex]];
      })
    );
  }

}