import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Monster } from 'src/app/models/monster.model';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from './player.service';

@Injectable({
    providedIn: 'root'
})
export class EventService implements OnInit {

    eventPercentageCut = [10, 40, 70, 80];
    foodNeeded: number = 1;
    event: string = "door";
    private readonly _event$: BehaviorSubject<string> = new BehaviorSubject<string>(this.event);

    player!: Player;

    constructor(private playerService: PlayerService) {
        this.playerService._getPlayer$().subscribe((player: Player) => {
            this.player = player;
        });
    }

    ngOnInit(): void {
        this.setEvent$(this.event);
    }

    setEvent$(event: string): void {
        this._event$.next(event);
    }

    getEvent$(): Observable<string> {
        return this._event$.asObservable();
    }

    next(event: string, chosenDoor?: string) {
        console.log(this.event, "service1");

        switch (true) {
            case event === "boss":
                this.goToRest();
                break;
            case this.player.currentEncounter === this.player.maxEncounter && this.player.bossFloor.includes(this.player.currentFloor):
                this.event = "boss";
                break;
            case this.player.currentEncounter === this.player.maxEncounter:
                this.goToRest();
                break;
            case event === "door":
                if (chosenDoor) this.event = chosenDoor;
                break;
            default:
                this.player.currentEncounter += 1;
                this.event = "door";
                this.randomDoors();
                break;
        }
        console.log(this.event, "service2");

        this.setEvent$(this.event);
        return { player: this.player, event: this.event };
    }

    randomEvent() {
        let d100 = Math.floor(Math.random() * 100);

        switch (true) {
            case d100 <= this.eventPercentageCut[0]:
                return "camp";
            case d100 > this.eventPercentageCut[0] && d100 <= this.eventPercentageCut[1]:
                return "loot";
            case d100 > this.eventPercentageCut[1] && d100 <= this.eventPercentageCut[2]:
                return "monster";
            case d100 > this.eventPercentageCut[2] && d100 <= this.eventPercentageCut[3]:
                return "shop";
            case d100 > this.eventPercentageCut[3]:
                return "trap";
            default:
                return "";
        }

    }

    randomDoors() {
        const door1 = this.randomEvent();
        let door2 = this.randomEvent();

        while (door2 === door1) {
            door2 = this.randomEvent();
        }

        return [door1, door2];
    }


    goToRest() {
        this.event = "rest";
        this.player.food -= this.foodNeeded;
        if (this.player.food < 0) this.player.life -= 5;
        this.player.currentEncounter = 0;
        this.player.currentFloor += 1;
    }



}