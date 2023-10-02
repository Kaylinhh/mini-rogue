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
  monsterList$!: Observable<Monster[]>;


  constructor(private monsterService: MonsterService) {
  }

  ngOnInit(): void {
    this.monsterList$ = this.monsterService.getMonstersByZone$(this.player.currentZone);
    };
  }


