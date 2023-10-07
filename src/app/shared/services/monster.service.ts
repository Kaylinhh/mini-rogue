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
  playerD6: number = 0;
  enemyD6: number = 0;

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

  fight(player: Player, enemy: Monster | Boss, retry: boolean): number {

    this.playerD6 = Math.ceil(Math.random() * 6);
    this.enemyD6 = Math.ceil(Math.random() * 6);

    if(this.playerD6 <= 2 && player.experience > 0 && retry === true) {
      player.experience -= 1;
      this.playerD6 = Math.ceil(Math.random() * 6);
      return this.playerD6;
    } else if(this.playerD6 <= 2 && player.experience === 0) {
      this.playerAttack(player, enemy);
      this.enemyAttack(player, enemy);
      return this.playerD6;
    } else {
      this.playerAttack(player, enemy);
      this.enemyAttack(player, enemy);
      return this.playerD6;
    }
  }

  playerAttack(player: Player, enemy: Monster | Boss): void {
    if (this.playerD6 >= 2) enemy.life -= this.playerDamageRoll(player); //need to roll a 2 or higher to hit

  }

  enemyAttack(player: Player, enemy: Monster | Boss): number {
    if (this.enemyD6 <= 5){
      player.life -= enemy.damage - player.armor;
      return enemy.damage - player.armor;
    } else {
      player.life -= enemy.damage; //ignores armor on crit
      return enemy.damage;
    } 
  }

  playerDamageRoll(player: Player): number {
    let damage: number = 0;
    for (let i = 0; i < player.die; i++) damage += Math.ceil(Math.random() * 6);
    return damage;
  }

}