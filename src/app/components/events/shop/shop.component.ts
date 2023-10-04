import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { ShopOffer } from 'src/app/models/shop-offer.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss', './../../../pages/game/game.component.scss']
})
export class ShopComponent {

  @Input()
  player!: Player;

  @Output()
  updatedPlayer: EventEmitter<Player> = new EventEmitter;

  @Output()
  nextEvent: EventEmitter<void> = new EventEmitter;

  shopSell: ShopOffer[] = [];
  shopBuy: ShopOffer[] = [];
  
  constructor(
    private httpClient: HttpClient,
    private lss: LocalStorageService
    ){}
  
  ngOnInit(){
    this.httpClient.get("assets/json/shop-trades.json").subscribe((data: any) =>{
      let randomTradeFirst = Math.floor(Math.random()*data.sell.length);
      let randomTradeSecond = Math.floor(Math.random()*data.sell.length);
      while(randomTradeSecond === randomTradeFirst){
        randomTradeSecond = Math.floor(Math.random()*data.sell.length);
      }
      // previous game saved
      if(this.player.status.startsWith("[S")){
        randomTradeFirst = parseInt((this.player.status.match(/\d+/g) as string[])[0]);
        randomTradeSecond = parseInt((this.player.status.match(/\d+/g) as string[])[1]);
      }
      
      this.shopSell.push(data.sell[randomTradeFirst]);
      this.shopSell.push(data.sell[randomTradeSecond]);
      this.shopBuy.push(data.buy[0]);
      this.shopBuy.push(data.buy[1]);

      let newStatus = "[S" + randomTradeFirst + "," + randomTradeSecond + "]"
      this.lss.update(newStatus);
      this.player.status = newStatus;
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

    /*if (currentTrade.typeGiven === "gold") {
      this.player.gold += currentTrade.quantityGiven;
      console.log(this.player.gold)
    } else if (currentTrade.typeGiven === "life") {
      this.player.life += currentTrade.quantityGiven;
      console.log(this.player.life)
    } else if (currentTrade.typeGiven === "armor") {
      this.player.armor += currentTrade.quantityGiven;
      console.log(this.player.armor)
    } else if (currentTrade.typeGiven === "food") {
      console.log(typeof(this.player.food))
      this.player.food = this.player.food+currentTrade.quantityGiven;
      console.log(this.player.food)
    }*/
    this.player[currentTrade.typeGiven] += currentTrade.quantityGiven;
  }

  next(): void {
    this.nextEvent.emit();
  }
}
