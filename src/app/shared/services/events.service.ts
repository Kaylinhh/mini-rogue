import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Monster } from 'src/app/models/monster.model';
import { Player } from 'src/app/models/player.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    eventPercentageCut = [10, 40, 70, 80];
    foodNeeded: number = 1;

    generateEncounter(): string {
        let encounter = Math.floor(Math.random() * 100);

        switch (true) {
            case encounter <= this.eventPercentageCut[0]:
                return "camp";
            case encounter > this.eventPercentageCut[0] && encounter <= this.eventPercentageCut[1]:
                return "loot";
            case encounter > this.eventPercentageCut[1] && encounter <= this.eventPercentageCut[2]:
                return "monster";
            case encounter > this.eventPercentageCut[2] && encounter <= this.eventPercentageCut[3]:
                return "shop";
            case encounter > this.eventPercentageCut[3]:
                return "trap";
            default:
                return "";
        }
    }

    goToEncounter(player: Player): Player { //to be improved

        if (player.currentEncounter < player.maxEncounter) {
            if (player.status.match(/^\[[A-Z]+/) || player.status === "[encounter]") {
                player.status = "[door]";
            } else {
                console.log(player.status, "ififelse")

                player.status = "[encounter]";
                player.currentEncounter += 1;
            }

        } else if (
            player.currentFloor === player.bossFloor[0] ||
            player.currentFloor === player.bossFloor[1] ||
            player.currentFloor === player.bossFloor[2]
        ) {
            console.log(player.status, "elseif")

            player.status = "[boss]";
            console.log(player.status, "elseif2")

        } else {
            
            player.status = "[rest]";
            console.log(player.status, "elseifelse")
            player.currentFloor += 1;
            console.log( player.status, "elseifelse2")

        }
        return player;
    }




    goToFloor(player: Player): void {
        if (player.food >= this.foodNeeded) {
            player.status = "[door]";
            player.food -= this.foodNeeded;
            player.currentEncounter = 1;
        } else {
            player.life -= 5;
        }
    }
}