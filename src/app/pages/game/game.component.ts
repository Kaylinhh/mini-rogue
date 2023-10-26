import { EventService } from './../../shared/services/events.service';
import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
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
    private eventService: EventService,
    private lss: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.playerService._getPlayer$().subscribe((player: Player) => {
      this.player = player;
    });
    this.eventService.getEvent$().subscribe((event: string) => {
      this.event = event;
    });
    if (this.player.status.match(/^\[[a-z]/)) this.event = "door";
    else if (this.player.status.match(/^\[B/)) this.event = "boss";
    else if (this.player.status.match(/^\[C/)) this.event = "camp";
    else if (this.player.status.match(/^\[L/)) this.event = "loot";
    else if (this.player.status.match(/^\[M/)) this.event = "monster";
    else if (this.player.status.match(/^\[S/)) this.event = "shop";
    else if (this.player.status.match(/^\[T/)) this.event = "trap";
    else this.event = "door";
  }

  next(chosenDoor?: string): void {
    if (chosenDoor === undefined) chosenDoor = "door";
    this.lss.save(this.player);
    this.event = "door";
    this.eventService.next(this.event, chosenDoor);
  }

  randomEvent(): void { //to be deleted
    this.event = this.eventService.randomEvent();
  }
}
