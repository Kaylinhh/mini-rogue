import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/shared/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  player!: Player;

  constructor(
    private playerService: PlayerService
  ){}

  ngOnInit(): void {
    this.playerService._getPlayer$().subscribe((player: Player) => {
      this.player = player;
    });
  }

  addLife(value: number): void {
    this.player.life += value;
    this.playerService._setPlayer$(this.player);
  }

}
