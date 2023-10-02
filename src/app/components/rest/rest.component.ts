import { EventService } from 'src/app/shared/services/events.service';
import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss']
})
export class RestComponent {

  player!: Player;
  foodNeeded: number = 1;
  event: string = "";

  constructor(
  private playerService: PlayerService,
  private eventService: EventService
  ){ }

ngOnInit(): void {
  this.playerService._getPlayer$().subscribe((player: Player) => {
    this.player = player;
    this.event = this.eventService.generateEncounter();
  });

}

goToNextFloor() {

  this.eventService.goToFloor(this.player);
  this.playerService._setPlayer$(this.player);
}
}
