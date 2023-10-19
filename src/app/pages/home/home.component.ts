import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Role } from 'src/app/models/role.model';
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

  allRoles!: Role[];

  roleSelected: string = "";

  roleDescription: string = "";

  constructor(
    private lss: LocalStorageService,
    private playerService: PlayerService,
    private httpClient: HttpClient
  ){}
  
  ngOnInit(): void {
    this.httpClient.get("assets/json/role.json").subscribe((data: any) => {
      this.allRoles = data;
    });
  }

  isGameSave(): boolean {
    return this.lss.exist();
  }

  clearGameSave(): void {
    this.lss.clear();
  }

  setDifficulty(value: string): void {
    this.difficultyChoosed = value;
    this.startingStats = this.playerService.getStartingStats(value);
    this.setCharacterRole("archer");
  }

  setCharacterRole(value: string): void {
    this.startingStats.role = value;
    for(let i = 0; i < this.allRoles.length; i++){
      if (this.allRoles[i].en === value) this.roleDescription = this.allRoles[i].desc;
    }
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
