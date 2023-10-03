import { Component } from '@angular/core';
import { Boss } from 'src/app/models/boss.model';

@Component({
  selector: 'app-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.scss']
})
export class BossComponent {

  boss!: Boss;

  
}
