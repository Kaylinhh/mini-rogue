import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Monster } from 'src/app/models/monster.model';

@Injectable({
    providedIn: 'root'
})
export class eventService {

    eventPercentageCut = [10,40,70,80];

    constructor(private http: HttpClient) { }

    _getMonsters$(): Observable<any> {
        return this.http.get<any>("/assets/json/monsters.json")
        .pipe(
            map(json => json.data)
        )
    }

    generateEncounter(): string {
        let encounter = Math.floor(Math.random() * 100);

        if (encounter <= this.eventPercentageCut[0]) {
            return "camp";
        } else if (encounter >  this.eventPercentageCut[0] && encounter <= this.eventPercentageCut[1]) {
            return "loot";
        } else if (encounter >  this.eventPercentageCut[1] && encounter <= this.eventPercentageCut[2]) {
            return "monster";
        } else if (encounter >  this.eventPercentageCut[2] && encounter <= this.eventPercentageCut[3]) {
            return "shop";
        } else {
            return "trap";
        }

    }

}