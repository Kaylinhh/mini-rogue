import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { EventService } from 'src/app/shared/services/events.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() nextEvent: EventEmitter<string> = new EventEmitter();

  player!: Player;
  event: string = "door";
  chosenDoor: string = "";
  doorList: string[] = [];

  constructor(
    private playerService: PlayerService,
    private eventService: EventService,
    private lss: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.playerService._getPlayer$().subscribe((player: Player) => {
      this.player = player;
    });
    this.doorList = this.eventService.randomDoors();
  }

  next(chosenDoor: string){
    this.nextEvent.emit(chosenDoor);
        
  }

  // generateDoors(): void {
  //   this.encounter1 = this.eventService.generateEncounter();
  //   this.encounter2 = this.encounter1;

  //   while (this.encounter2 === this.encounter1) {
  //     this.encounter2 = this.eventService.generateEncounter();
  //   }
  //   // previous game saved
  //   if (this.player.status != "[door]") {
  //     this.encounter1 = (this.player.status.match(/\w+/g) as string[])[0];
  //     this.encounter2 = (this.player.status.match(/\w+/g) as string[])[1];
  //   }

  //   this.encounterList = [this.encounter1, this.encounter2];
  //   let newStatus = "[" + this.encounter1 + "," + this.encounter2 + "]";
  //   this.lss.update(newStatus);
  //   this.player.status = newStatus;
  // }

}
