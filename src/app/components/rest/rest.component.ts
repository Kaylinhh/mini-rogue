import { EventService } from 'src/app/shared/services/events.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/shared/services/player.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

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
    private lss: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.playerService._getPlayer$().subscribe((player: Player) => {
      this.player = player;
      let newStatus = "[R]";
      this.lss.update(newStatus);
      this.player.status = newStatus;
    });
  }

  next(): void {
    this.nextEvent.emit(this.event);
  }
}
