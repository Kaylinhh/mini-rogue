import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../../models/player.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private readonly _player$: BehaviorSubject<Player> = new BehaviorSubject<Player>(new Player(10,0,10,5,0,[],[],1,"encounter",1,4,1,7,1,[2,4,7]));

  constructor(private lss: LocalStorageService) { }

  ngOnInit(): void {
    if(this.lss.exist() && this.lss.get() != ""){
      let gameInfo: any[] = this.lss.get().split(";");
      this._setPlayer$(new Player(gameInfo[0],gameInfo[1],gameInfo[2],gameInfo[3],gameInfo[4],gameInfo[5],gameInfo[6],gameInfo[7],gameInfo[8],gameInfo[9],gameInfo[10],gameInfo[11],gameInfo[12],gameInfo[13],gameInfo[14]));
    }
  }

  _setPlayer$(player: Player): void {
    this._player$.next(player);
  }

  _getPlayer$(): Observable<Player> {
    return this._player$.asObservable();
  }

}
