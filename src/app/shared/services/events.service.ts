import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Monster } from 'src/app/models/monster.model';

@Injectable({
    providedIn: 'root'
})
export class eventService {

    constructor(private http: HttpClient) { }

    _getMonsters$(): Observable<any> {
        return this.http.get<any>("/assets/json/monsters.json")
        .pipe(
            map(json => json.data)
        )
    }

}