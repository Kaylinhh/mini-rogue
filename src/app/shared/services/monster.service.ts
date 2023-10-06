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

  constructor(private http: HttpClient) { }

  getMonsterByZone$(zone: number): Observable<Monster[]> {
    return this.monster.pipe(
      map((monsters: Monster[]) => monsters.filter(monster => monster.zoneNumber === zone)),
      map((filteredMonsters: Monster[]) => {
        const randomIndex = Math.floor(Math.random() * filteredMonsters.length);
        return [filteredMonsters[randomIndex]];
      })
    );
  }

  getBossByZone$(zone: number): Observable<Boss[]> {
    return this.boss.pipe(
      map((bosses: Boss[]) => bosses.filter(boss => boss.zoneNumber === zone)),
      map((filteredBosses: Boss[]) => {
        const randomIndex = Math.floor(Math.random() * filteredBosses.length);
        return [filteredBosses[randomIndex]];
      })
    );
  }

  fight(player: Player, enemy: Monster | Boss): number {
    let playerD6: number = 0;
    let enemyD6: number = 0;

    playerD6 = Math.ceil(Math.random() * 6);
    enemyD6 = Math.ceil(Math.random() * 6);

    if (playerD6 >= 2) enemy.life -= this.playerDamageRoll(player);
    if (enemyD6 === 5) player.life -= player.armor - enemy.damage;
    if (enemyD6 === 6) player.life -= enemy.damage; //ignores armor on crit

    return playerD6;
  }

  playerDamageRoll(player: Player): number {
    let damage: number = 0;
    for (let i = 0; i < player.die; i++) damage += Math.ceil(Math.random() * 6);
    return damage;
  }

}