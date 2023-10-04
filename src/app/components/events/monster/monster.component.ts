import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Monster } from 'src/app/models/monster.model';
import { Player } from 'src/app/models/player.model';
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

  constructor(
    private monsterService: MonsterService,
    private playerService: PlayerService,
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
    this.monsterService.fight(this.player, this.monster);
    this.playerService._setPlayer$(this.player);
  }

  next(): void {
    this.playerService._setPlayer$(this.player);
    this.nextEvent.emit();
  }
}

