import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Monster } from 'src/app/models/monster.model';
import { Player } from 'src/app/models/player.model';
import { MonsterService } from 'src/app/shared/services/monster.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss']
})
export class MonsterComponent implements OnInit {

  @Input() player!: Player;

  monster!: Monster;
  monsterList!: Monster[];
  playerDieRoll: number = 0;
  monsterDieRoll: number = 0;

  constructor(private monsterService: MonsterService,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.monsterService.getMonstersByZone$(this.player.currentZone).subscribe(data => {
      this.monsterList = data;
      [this.monster] = this.monsterList;
    })
  };

  fight(): void {
    
    
    while (this.player.life > 0 && this.monster.life > 0) { //so every iteration makes one round
      this.playerDieRoll = Math.ceil(Math.random() * 6);
      this.monsterDieRoll = Math.ceil(Math.random() * 6);
      
      //while player.life > 0, player attacks (first), then monster attacks => one round
      //they need to succeed on their diceRoll to hit
      
      if(this.playerDieRoll >= 3) this.monster.life -= 2; //player's dmg to be discussed
      if(this.monsterDieRoll === 6) this.player.life -= this.monster.damage; //ignores armor on crit
      if(this.monsterDieRoll === 5) this.player.life -= this.player.armor - this.monster.damage;

      console.log(this.player.life, this.playerDieRoll, this.monster.life, this.monsterDieRoll);
      
    }

    this.playerService._setPlayer$(this.player);

  }
}

