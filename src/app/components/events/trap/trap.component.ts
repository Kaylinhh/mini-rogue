import { EventService } from 'src/app/shared/services/events.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Trap } from 'src/app/models/trap.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-trap',
  templateUrl: './trap.component.html',
  styleUrls: ['./trap.component.scss']
})
export class TrapComponent {

  @Input()
  player!: Player;

  @Output()
  nextEvent: EventEmitter<void> = new EventEmitter;

  blackDie!: number;

  whiteDice!: number[];

  isWhiteDiceSucced: boolean = false;

  currentTrap!: Trap;

  currentLineEffect: number = -1;

  canProceed: boolean = false;

  randomTrapIndex: number = 0;


  constructor(
    private httpClient: HttpClient,
    private lss: LocalStorageService
    ){}

  ngOnInit(): void {
    this.httpClient.get("assets/json/traps.json").subscribe((data: any) => {
      this.randomTrapIndex = Math.floor(Math.random()*data[this.player.currentZone-1].length);
      // previous game saved
      if(this.player.status.startsWith("[T")){
        this.randomTrapIndex = parseInt((this.player.status.match(/\d+/g) as string[])[0]);
        if((this.player.status.match(/\d+/g) as string[]).length > 1){
          this.blackDie = parseInt((this.player.status.match(/\d+/g) as string[])[1]);
          this.whiteDice = [];
          for(let i = 2; i < (this.player.status.match(/\d+/g) as string[]).length; i++){
            this.whiteDice.push(parseInt((this.player.status.match(/\d+/g) as string[])[i]));
          }
        }
      }

      this.currentTrap = data[this.player.currentZone-1][this.randomTrapIndex];

      let blackAndWhite: string = "";
      if(this.blackDie && this.whiteDice.length > 0) blackAndWhite += this.blackDie + "," + this.whiteDice;
      let newStatus: string = "[T" + this.randomTrapIndex + "," + blackAndWhite + "]";
      this.lss.update(newStatus);
      this.player.status = newStatus;
    });
  }

  proceed(): void {
    this.canProceed = true;
  }

  next(): void {
    this.nextEvent.emit();
  }

  blackDieReceive(pips: number): void {
    this.blackDie = pips;
    for(let i = 0; i < this.currentTrap.linesOfEffect.length; i++){
      if(this.currentTrap.linesOfEffect[i].blackDie.includes(this.blackDie)){
        this.currentLineEffect = i;
        let newStatus = "[T" + this.randomTrapIndex + "," + this.blackDie + "," + this.whiteDice + "]";
        this.lss.update(newStatus);
        this.player.status = newStatus;
        break;
      }
    }
  }

  whiteDiceReceive(dice: number[]): void {
    this.whiteDice = dice;
    this.isWhiteDiceSucced = false;
    for(let i = 0; i < dice.length; i++){
      if(dice[i] >= 5){
        this.isWhiteDiceSucced = true;
      }
    }
    let newStatus = "[T" + this.randomTrapIndex + "," + this.blackDie + "," + this.whiteDice + "]";
    this.lss.update(newStatus);
    this.player.status = newStatus;
  }

}
