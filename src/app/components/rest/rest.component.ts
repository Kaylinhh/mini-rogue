import { EventService } from 'src/app/shared/services/events.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss']
})
export class RestComponent {

  @Input() player!: Player;
  foodNeeded: number = 1;
  event: string = "rest";
  @Output() nextEvent: EventEmitter<string> = new EventEmitter;

  constructor(
    private playerService: PlayerService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.playerService._getPlayer$().subscribe((player: Player) => {
      this.player = player;
    });
  }

  next(): void {
    this.nextEvent.emit(this.event);
    this.eventService.next(this.event);
    // this.player.currentEncounter = 0;
    // this.player.currentFloor += 1;
    // this.playerService._setPlayer$(this.player);

  }
}
