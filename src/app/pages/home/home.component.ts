import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private lss: LocalStorageService){}

  isGameSave(): boolean {
    return this.lss.exist();
  }

  clearGameSave(): void {
    this.lss.clear();
  }

}
