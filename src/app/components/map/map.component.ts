import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  player!: Player;
  firstD100: number = 0;
  secondD100: number = 0;

  constructor(
    private playerService: PlayerService
  ){}
  
  ngOnInit(): void {
    // this.playerService._getPlayer$().subscribe((player: Player) => {
    //   this.player = player;
    // });
    this.randomEvent();
  }
  
  randomEvent(): void {
    this.firstD100 = Math.floor(Math.random() * 100);
    this.secondD100 = Math.floor(Math.random() * 100);
  }
}
