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

  newStatus: string = "";
  
  constructor(
    private playerService: PlayerService,
    private eventService: EventService,
    private lss: LocalStorageService
    ) {

     }
    
    ngOnInit(): void {
      this.doorList = this.eventService.randomDoors();
      
      this.playerService._getPlayer$().subscribe((player: Player) => {
        this.player = player;
        console.log(this.player.status, "onrandom");
        
        // previous game saved
      //   if (this.player.status != "[door]") {
      //    this.doorList[0] = (this.player.status.match(/\w+/g) as string[])[0];
      //    this.doorList[1] = (this.player.status.match(/\w+/g) as string[])[1];
      //  }
        this.newStatus = "[" + this.doorList[0] + "," + this.doorList[1] + "]";
        this.player.status = this.newStatus;
        this.lss.update(this.newStatus);
        console.log(this.newStatus, this.player.status);
      });
      
      
  }
  
  next(chosenDoor: string){
    this.nextEvent.emit(chosenDoor);     
  }

}
