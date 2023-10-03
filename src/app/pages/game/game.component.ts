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
    this.event = this.eventService.generateEncounter();
  }

  next(): void {
    this.lss.save(this.player);
    this.eventService.goToEncounter(this.player);
  }

  currentEncounter(event: string): void {
    this.event = event;
  }

  randomEvent(): void { //to be deleted
    this.event = this.eventService.generateEncounter();
  }
}
