import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CampChoice } from 'src/app/models/camp-choice.model';
import { Player } from 'src/app/models/player.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.scss', './../../../pages/game/game.component.scss']
})
export class CampComponent {

  @Input()
  player!: Player;

  @Output()
  nextEvent: EventEmitter<void> = new EventEmitter;

  currentCamp: CampChoice[] = [];

  isChoiceMade: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private lss: LocalStorageService
    ){}

  ngOnInit(): void {
    this.httpClient.get("assets/json/camps.json").subscribe((data: any) => {
      let choosedCampIndex: number[] = [];
      let randoms: string = "";
      for(let i = 0; i < 3; i++){
        let randomCamp = Math.floor(Math.random()*data.length);
        while(choosedCampIndex.includes(randomCamp)){
          randomCamp = Math.floor(Math.random()*data.length);
        }
        choosedCampIndex.push(randomCamp);
        this.currentCamp.push(data[randomCamp]);
        randoms += randomCamp;
        if(i < 2) randoms += ",";
      }
      this.lss.update("[C" + randoms + "]");
    });
  }

  choosed(quantity: number, type: "life" | "experience" | "gold" | "food" | "armor"): void {
    this.player[type] += quantity;
    this.isChoiceMade = true;
  }

  next(): void {
    this.nextEvent.emit();
  }

}
