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
    this.monsterService.getMonsterByZone$(this.player.currentZone).subscribe(data => {
      this.monsterList = data;
      [this.monster] = this.monsterList;
    })
  };

  fight(): void {

    this.monsterService.fight(this.monster);
    this.playerService._setPlayer$(this.player);

  }
}

