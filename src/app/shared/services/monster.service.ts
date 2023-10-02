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
    boss: Observable<Boss[]> = this.http.get<Boss[]>("/assets/json/bosses.json");
    private _monstersByZoneSubject$: BehaviorSubject<Monster[]> = new BehaviorSubject<Monster[]>([]);
    private _bossesByZoneSubject$: BehaviorSubject<Boss[]> = new BehaviorSubject<Boss[]>([]);

    constructor(private http: HttpClient) { }

    get monsterByZone$(): Observable<Monster[]> {
        return this._monstersByZoneSubject$.asObservable();
    }

    get bossByZone$(): Observable<Monster[]> {
        return this._monstersByZoneSubject$.asObservable();
    }

    // getMonstersByZone$(zone: number): Observable<Monster[]> {
    //     this.monster
    //       .subscribe(monster => {
    //         this._monstersByZoneSubject$.next(monster.filter(monster => monster.zoneNumber === zone) as Monster[])
    //       });
    //     return this._monstersByZoneSubject$.asObservable();
    // }


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
    
    getBossByZone$(zone: number): Observable<Boss[]> {
        this.boss
          .subscribe(boss => {
            this._bossesByZoneSubject$.next(boss.filter(boss => boss.zoneNumber === zone) as Boss[])
          });
        return this._bossesByZoneSubject$.asObservable();
    }
}