import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-die-roll',
  templateUrl: './die-roll.component.html',
  styleUrls: ['./die-roll.component.scss']
})
export class DieRollComponent {

  @Input()
  player!: Player;

  @Output()
  blackDie: EventEmitter<number> = new EventEmitter;

  @Output()
  whiteDice: EventEmitter<number[]> = new EventEmitter;

  ngOnInit(): void {
    this.blackDie.emit(Math.floor(Math.random()*6)+1);
    let whiteDiceGeneration: number[] = [];
    for(let i = 0; i < this.player.die; i++){
      whiteDiceGeneration.push(Math.floor(Math.random()*6)+1);
    }
    this.whiteDice.emit(whiteDiceGeneration);
  }

  roll(): void {
    //
  }

}
