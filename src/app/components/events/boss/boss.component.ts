import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Boss } from 'src/app/models/boss.model';
import { Player } from 'src/app/models/player.model';
import { EventService } from 'src/app/shared/services/events.service';
import { MonsterService } from 'src/app/shared/services/monster.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.scss']
})
export class BossComponent {

  @Input() player!: Player;
  @Output() nextEvent: EventEmitter<void> = new EventEmitter;

  boss!: Boss;
  bossList!: Boss[];
  playerDieRoll: number = 0;
  bossDieRoll: number = 0;

  constructor(
    private monsterService: MonsterService,
    private playerService: PlayerService,
    private eventService: EventService

  ) { }

  ngOnInit(): void {
    this.monsterService.getMonsterByZone$(this.player.currentZone).subscribe(data => {
      this.bossList = data;
      [this.boss] = this.bossList;
    })
  };

  fight(): void {

    this.monsterService.fight(this.player, this.boss);
    this.playerService._setPlayer$(this.player);
  }
  
  next(): void {
    this.nextEvent.emit();
    this.player.status = "rest";
    this.playerService._setPlayer$(this.player);
  }
  
}
