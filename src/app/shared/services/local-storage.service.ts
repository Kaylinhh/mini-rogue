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
        let value: string = player.life + ";" + player.experience + ";" + player.gold + ";" + player.food + ";" + player.armor + ";" + player.currentEncounter + ";" + player.currentFloor + ";" + player.currentZone + ";" + player.bossFloor + player.status;
        // TODO : 15 infos (check new Player)
        localStorage.setItem('MiniRogueGameSave', value);
    }
}
