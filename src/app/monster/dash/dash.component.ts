import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.custom';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  monstersOneStars: any = [];
  monstersTwoStars: any = [];
  monstersThreeStars: any = [];
  monstersFourStars: any = [];
  monstersFiveStars: any = [];
  elementSelected: string = 'fire';
  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    await this.getMonsters();
  }

  async getMonsters() {
    const getMonster: any = await firstValueFrom(this.http.get(environment.apiAdress + 'monsters?element=' + this.elementSelected, { withCredentials: true }));
    getMonster.body.forEach((monster: any) => {
      if (monster.baseStars === 1) {
        this.monstersOneStars.push(monster);
      } else if (monster.baseStars === 2) {
        this.monstersTwoStars.push(monster);
      } else if (monster.baseStars === 3) {
        this.monstersThreeStars.push(monster);
      } else if (monster.baseStars === 4) {
        this.monstersFourStars.push(monster);
      } else if (monster.baseStars === 5) {
        this.monstersFiveStars.push(monster);
      }
    });
  }

  async changeElement(element: string) {
    this.elementSelected = element;
    this.monstersOneStars = [];
    this.monstersTwoStars = [];
    this.monstersThreeStars = [];
    this.monstersFourStars = [];
    this.monstersFiveStars = [];
    await this.getMonsters();
  }
}
