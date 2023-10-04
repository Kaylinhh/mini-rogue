import { Injectable } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


    exist(): boolean {
        return localStorage.getItem('MiniRogueGameSave') != null && localStorage.getItem('MiniRogueGameSave') != "" ? true : false;
    }

    clear(): void {
        localStorage.setItem('MiniRogueGameSave', '');
    }

    get(): string {
        if(localStorage.getItem('MiniRogueGameSave') != null) return localStorage.getItem('MiniRogueGameSave') as string;
        return "";
    }

    save(player: Player): void {
        let value: string = player.life + ";" + player.experience + ";" + player.gold + ";" + player.food + ";" + player.armor + ";" + player.bonus + ";" + player.penalty + ";" + player.die + ";[" + player.status + "];" + player.currentEncounter + ";" + player.maxEncounter + ";" + player.currentFloor + ";" + player.maxFloor + ";" + player.currentZone + ";" + player.bossFloor;
        localStorage.setItem('MiniRogueGameSave', value);
    }

    update(status: string): void {
        let oldStatusList: string[] = this.get().match(/\[.+\]/) as string[];
        let oldStatus: string = oldStatusList[0];
        let newSave = localStorage.getItem('MiniRogueGameSave')?.replace(oldStatus, status);
        localStorage.setItem('MiniRogueGameSave', newSave as string);
    }
}
