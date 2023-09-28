import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.scss']
})
export class LootComponent {

  @Input()
  player!: Player;

  constructor(private httpClient: HttpClient){}

}
