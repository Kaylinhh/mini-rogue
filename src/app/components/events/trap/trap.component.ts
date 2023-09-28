import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Trap } from 'src/app/models/trap.model';

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

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.httpClient.get("assets/json/traps.json").subscribe((data: any) => {
      this.currentTrap = data[this.player.currentZone-1][Math.floor(Math.random()*data[this.player.currentZone-1].length)];
      let blackDieRolled: number = Math.floor(Math.random()*6)+1;
      for(let i = 0; i < this.currentTrap.linesOfEffect.length; i++){
        if(this.currentTrap.linesOfEffect[i].blackDie.includes(blackDieRolled)){
          this.currentLineEffect = i;
          break;
        }
      }
    });
  }

  next(): void {
    this.nextEvent.emit();
  }

  blackDieReceive(pips: number): void {
    this.blackDie = pips;
  }

  whiteDiceReceive(dice: number[]): void {
    this.whiteDice = dice;
    for(let i = 0; i < dice.length; i++){
      if(dice[i] >= 5) this.isWhiteDiceSucced = true;
    }
  }

}
