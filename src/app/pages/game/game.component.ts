import { EventService } from './../../shared/services/events.service';
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
  event: string = "";


  constructor(
    private playerService: PlayerService,
    private eventService: EventService
  ){}

  ngOnInit(): void {
    this.playerService._getPlayer$().subscribe((player: Player) => {
      this.player = player;
    });
    this.event = this.eventService.generateEncounter();
  }

  next(): void {
    
    if (this.player.currentEncounter < this.player.maxEncounter) {

      if (this.player.status === "encounter") this.player.status = "door";
      else this.player.status = "encounter";
      this.playerService._setPlayer$(this.player);

    } else {

      this.player.status = "rest";
      this.playerService._setPlayer$(this.player);

    }

  }

  currentEncounter(event: string): void {
    this.event = event;
  }

  randomEvent(): void { //to be deleted
    this.event = this.eventService.generateEncounter();
  }
}
