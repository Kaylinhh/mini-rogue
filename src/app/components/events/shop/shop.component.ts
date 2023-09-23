import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { ShopOffer } from 'src/app/models/shop-offer.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  @Input()
  player!: Player;

  @Output()
  updatedPlayer: EventEmitter<Player> = new EventEmitter;

  shopSell: ShopOffer[] = [];
  shopBuy: ShopOffer[] = [];
  
  constructor(private httpClient: HttpClient){}
  
  ngOnInit(){
    this.httpClient.get("assets/json/shop-trades.json").subscribe((data: any) =>{
      this.shopSell.push(data.sell[0]);
      this.shopBuy.push(data.buy[0]);
    })
  }

  trade(transaction: string, index: number): void {
    let currentTrade: ShopOffer;
    if(transaction === 'buy') currentTrade = this.shopSell[index];
    else currentTrade = this.shopBuy[index];

    if (currentTrade.typeWanted === "gold" && this.player.gold >= currentTrade.quantityWanted) {
      this.player.gold -= currentTrade.quantityWanted;
    } else if (currentTrade.typeWanted === "life" && this.player.life >= currentTrade.quantityWanted) {
      this.player.life -= currentTrade.quantityWanted;
    } else if (currentTrade.typeWanted === "armor" && this.player.armor >= currentTrade.quantityWanted) {
      this.player.armor -= currentTrade.quantityWanted;
    } else {
      return;
    }
    this.player[currentTrade.typeGiven] += currentTrade.quantityGiven;
    this.updatedPlayer.emit(this.player);
  }
}
