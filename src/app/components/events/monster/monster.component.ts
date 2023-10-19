import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Monster } from 'src/app/models/monster.model';
import { Player } from 'src/app/models/player.model';
import { EventService } from 'src/app/shared/services/events.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { MonsterService } from 'src/app/shared/services/monster.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss']
})
export class MonsterComponent implements OnInit {

  @Input() player!: Player;
  @Output() nextEvent: EventEmitter<void> = new EventEmitter;

  monster!: Monster;
  monsterList!: Monster[];
  event: string = "";
  playerD6: number = 0;
  isFighting: boolean = false;
  retry: boolean = false;

  constructor(
    private monsterService: MonsterService,
    private eventService: EventService,
    private lss: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.monsterService.getMonsterByZone$(this.player.currentZone).subscribe(data => {
      this.monsterList = data;
      [this.monster] = this.monsterList;
      let newStatus = "[M]";
      this.lss.update(newStatus);
      this.player.status = newStatus;
    })
  };

  fight(): void {
    this.playerD6 = this.monsterService.fight(this.player, this.monster, this.retry);
    this.isFighting = true;
    if (this.monster.life <= 0) this.isFighting = false;
  }

  tryAgain() {
  this.retry = true;
  this.fight();
  }

  next(): void {
    this.nextEvent.emit();
  }
}

