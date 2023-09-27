import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() diceRoll: EventEmitter<number> = new EventEmitter();

  player!: Player;
  firstD100: number = 0;
  secondD100: number = 0;
  setOfDice: number[] = [];

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.playerService._getPlayer$().subscribe((player: Player) => {
      this.player = player;
    });
    this.randomEvent();
    this.setOfDice = [this.firstD100, this.secondD100]
  }

  randomEvent(): void {
    this.firstD100 = Math.floor(Math.random() * 100);
    this.secondD100 = Math.floor(Math.random() * 100);
  }

  goToEvent(dice: number) {

    if (this.player.currentEncounter < this.player.maxEncounter) {

      this.player.status = "encounter";
      this.player.currentEncounter += 1;
      this.playerService._setPlayer$(this.player);

    } else {

      this.player.status = "rest";
      this.playerService._setPlayer$(this.player);

    }

    this.diceRoll.emit(dice);


  }
}
