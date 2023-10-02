import { Component, Input, OnInit } from '@angular/core';
import { Monster } from 'src/app/models/monster.model';
import { Player } from 'src/app/models/player.model';
import { MonsterService } from 'src/app/shared/services/monster.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss']
})
export class MonsterComponent implements OnInit {

  @Input() player!: Player;

  monster!: Monster;
  monsterList!: Monster[];

  constructor(private monsterService: MonsterService) {
    this.monsterList = [];
  }

  ngOnInit(): void {
    this.monsterService.getMonstersByZone$(this.player.currentZone).subscribe(data => {
      this.monsterList = data;
      console.log(this.monsterList);
    });
    console.log(this.monsterList);
  }

  // //to get random monster, need random index from monsterList
  // currentMonster(){
  //   let currentIndex = Math.floor(Math.random() * this.monsterList.length);
  //   console.log(currentIndex);

  //   this.monster = this.monsterList[currentIndex];
  //   console.log(this.monster);
  //}


}