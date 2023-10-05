import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../../models/player.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _normalPlayer: Player = new Player(12,0,10,5,0,[],[],1,"[door]",0,4,1,7,1,[2,4,7]);

  private _hardPlayer: Player = new Player(10,0,5,2,0,[],[],1,"[door]",0,6,1,8,1,[2,4,8]);

  private readonly _player$: BehaviorSubject<Player> = new BehaviorSubject<Player>(this._normalPlayer);

  constructor(private lss: LocalStorageService) { this.ngOnInit() }

  ngOnInit(): void {
    if(this.lss.exist() && this.lss.get() != ""){
      this._setPlayer$(this.lss.getPlayerFromSave());
    }
  }

  _setPlayer$(player: Player): void {
    this._player$.next(player);
  }

  _getPlayer$(): Observable<Player> {
    return this._player$.asObservable();
  }

  getStartingStats(value: string): Player {
    if(value === "normal") return this._normalPlayer;
    else return this._hardPlayer;
  }

}
