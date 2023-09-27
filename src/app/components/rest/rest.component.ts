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
  foodNeeded: number = 4;
  d100: number = 0;

  constructor(
    private playerService: PlayerService
  ){}
  
  ngOnInit(): void {
    this.playerService._getPlayer$().subscribe((player: Player) => {
      this.player = player;
    });
    this.d100 = Math.floor(Math.random() * 100);
    
  }

  goToNextFloor() {

    if (this.player.food >= this.foodNeeded) {
      this.player.status = "encounter";
      this.player.food -= this.foodNeeded;
      this.player.currentFloor += 1;
      this.player.currentEncounter = 1;
      this.playerService._setPlayer$(this.player);
    } else {

    }

  }
}
