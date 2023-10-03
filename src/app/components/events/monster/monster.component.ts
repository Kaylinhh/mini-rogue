import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Monster } from 'src/app/models/monster.model';
import { Player } from 'src/app/models/player.model';
import { EventService } from 'src/app/shared/services/events.service';
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

  constructor(
    private monsterService: MonsterService,
    private playerService: PlayerService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.monsterService.getMonsterByZone$(this.player.currentZone).subscribe(data => {
      this.monsterList = data;
      [this.monster] = this.monsterList;
    })
  };

  fight(): void {
    this.monsterService.fight(this.player, this.monster);
    this.playerService._setPlayer$(this.player);
  }

  next(): void {
    this.nextEvent.emit();
  }
}

