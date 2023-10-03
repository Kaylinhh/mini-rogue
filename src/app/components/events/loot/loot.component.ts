import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { QuantityType } from 'src/app/models/quantity-type.model';
import { Utils } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.scss', './../../../pages/game/game.component.scss']
})
export class LootComponent {

  @Input()
  player!: Player;

  @Output()
  nextEvent: EventEmitter<void> = new EventEmitter;

  currentLoot: QuantityType[] = [];

  constructor(
    private httpClient: HttpClient,
    private utils: Utils
    ){}

  ngOnInit(): void {
    this.httpClient.get("assets/json/loots.json").subscribe((data: any) => {
      let randomLoot = Math.floor(Math.random()*data.length);
      this.currentLoot.push({"quantity":data[randomLoot].quantity*this.player.currentZone, "type":data[randomLoot].type});

      for(let i = 0; i < this.currentLoot.length; i++){
        this.player[this.currentLoot[i].type] += this.currentLoot[i].quantity;
      }
    });
  }

  next(): void {
    this.nextEvent.emit();
  }
}
