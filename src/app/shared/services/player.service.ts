import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../../models/player.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _basePlayer: Player = new Player(10,0,10,5,0,[],[],1,"[door]",0,4,1,7,1,[2,4,7]);

  private readonly _player$: BehaviorSubject<Player> = new BehaviorSubject<Player>(this._basePlayer);

  constructor(private lss: LocalStorageService) { this.ngOnInit() }

  ngOnInit(): void {
    if(this.lss.exist() && this.lss.get() != ""){
      this._setPlayer$(this.lss.getPlayerFromSave());
    }else{
      this.lss.save(this._basePlayer);
    }
  }

  _setPlayer$(player: Player): void {
    this._player$.next(player);
  }

  _getPlayer$(): Observable<Player> {
    return this._player$.asObservable();
  }

}
