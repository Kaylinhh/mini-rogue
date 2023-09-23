import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  player!: Player;

  d100: number = 0;

  constructor(
    private playerService: PlayerService
  ){}

  ngOnInit(): void {
    this.playerService._getPlayer$().subscribe((player: Player) => {
      this.player = player;
    });
    this.randomEvent();
  }

  next(): void {
    if(this.player.status === "encounter") this.player.status = "door";
    else this.player.status = "encounter";
    this.playerService._setPlayer$(this.player);
  }

  randomEvent(): void {
    this.d100 = Math.floor(Math.random() * 100);
  }

  updatedPlayerReceive(player: Player): void {
    this.playerService._setPlayer$(player);
  }
}
