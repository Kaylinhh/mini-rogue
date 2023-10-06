import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class BossComponent implements OnInit {

  @Input() player!: Player;
  @Output() nextEvent: EventEmitter<void> = new EventEmitter;

  boss!: Boss;
  bossList!: Boss[];
  playerDieRoll: number = 0;
  bossDieRoll: number = 0;
  playerD6: number = 0;
  isFighting: boolean = false;

  constructor(
    private monsterService: MonsterService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.monsterService.getBossByZone$(this.player.currentZone).subscribe(data => {
      this.bossList = data;
      [this.boss] = this.bossList;
    })
  };

  fight(): void {
    this.playerD6 = this.monsterService.fight(this.player, this.boss);
    this.isFighting = true;
    if (this.boss.life <= 0) this.isFighting = false;
  }
  
  next(): void {
    this.nextEvent.emit();
  }
  
}
