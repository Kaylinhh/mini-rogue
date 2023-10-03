import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Boss } from 'src/app/models/boss.model';
import { Monster } from 'src/app/models/monster.model';
import { Player } from 'src/app/models/player.model';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  monster: Observable<Monster[]> = this.http.get<Monster[]>("/assets/json/monsters.json");
  boss: Observable<Boss[]> = this.http.get<Boss[]>("/assets/json/bosses.json");
  player!: Player;
  playerDieRoll: number = 0;
  monsterDieRoll: number = 0;

  constructor(private http: HttpClient) { }

  getMonsterByZone$(zone: number): Observable<Monster[]> {
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
    return this.boss.pipe(
      map((bosses: Boss[]) => bosses.filter(boss => boss.zoneNumber === zone)),
      map((filteredBosses: Boss[]) => {
        const randomIndex = Math.floor(Math.random() * filteredBosses.length);
        console.log(randomIndex, filteredBosses);
        return [filteredBosses[randomIndex]];
      })
    );
  }

  fight(enemy: Monster | Boss) {
        
    // Player attacks (first), then monster attacks => one round
    while (this.player.life > 0 && enemy.life > 0) {
      this.playerDieRoll = Math.ceil(Math.random() * 6);
      this.monsterDieRoll = Math.ceil(Math.random() * 6);
      
      //they need to succeed on their diceRoll to hit
      if(this.playerDieRoll >= 3) enemy.life -= 2; //player's dmg to be discussed
      if(this.monsterDieRoll === 5) this.player.life -= this.player.armor - enemy.damage;      
      if(this.monsterDieRoll === 6) this.player.life -= enemy.damage; //ignores armor on crit
    }
  }

}