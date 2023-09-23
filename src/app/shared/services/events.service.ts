import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    private readonly BASE_URL = "/assets/json/encounters.json";

    constructor(private http: HttpClient) { }

    _getAllEvents$(): Observable<any> {
        return this.http.get<any>(this.BASE_URL)
            .pipe(
                map(json => json.data)
            );
    }
}