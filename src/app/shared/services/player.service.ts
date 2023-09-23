import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private readonly _player$: BehaviorSubject<Player> = new BehaviorSubject<Player>(new Player(10,0,10,5,0,[],[],1,"encounter",1,4,1,7,1,[2,4,7]));

  constructor() { }

  _setPlayer$(player: Player): void {
    this._player$.next(player);
  }

  _getPlayer$(): Observable<Player> {
    return this._player$.asObservable();
  }

}
