import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  chooseDifficulty: boolean = false;

  difficultyChoosed: string = "";

  startingStats!: Player;

  constructor(
    private lss: LocalStorageService,
    private playerService: PlayerService
    ){}

  isGameSave(): boolean {
    return this.lss.exist();
  }

  clearGameSave(): void {
    this.lss.clear();
  }

  setDifficulty(value: string): void {
    this.difficultyChoosed = value;
    this.startingStats = this.playerService.getStartingStats(value);
  }

  launch(): void {
    this.startingStats.bossFloor[2] = this.startingStats.maxFloor;
    if (this.startingStats.bossFloor[0] >= this.startingStats.bossFloor[1]) this.startingStats.bossFloor[1] = this.startingStats.bossFloor[0] + 1;
    if (this.startingStats.bossFloor[1] >= this.startingStats.bossFloor[2]) {
      this.startingStats.bossFloor[2] = this.startingStats.bossFloor[1] + 1;
      this.startingStats.maxFloor = this.startingStats.bossFloor[2];
    }
    this.playerService._setPlayer$(this.startingStats);
    this.lss.save(this.startingStats);
  }

}
