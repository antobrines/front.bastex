import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.custom';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user: any;
  monsters: any;
  monstersNameAndId: any = [];
  filteredOptions1: any[] = [];
  filteredOptions2: any[] = [];
  filteredOptions3: any[] = [];
  monster1: string = '';
  monster2: string = '';
  monster3: string = '';
  power1 = null;
  power2 = null;
  power3 = null;
  summonerSelected = 'Cleaf';
  summonerPower = null;
  searchTerm1: string = '';
  searchTerm2: string = '';
  searchTerm3: string = '';
  constructor(private http: HttpClient) { }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async ngOnInit(): Promise<void> {
    const resUser: any = await firstValueFrom(this.http.get(environment.apiAdress + 'user/discord/me', { withCredentials: true }));
    this.user = resUser.body;
    const getMonsterOwnPrincipal: any = await firstValueFrom(this.http.get(environment.apiAdress + 'user/monsters?isPrincipal=true', { withCredentials: true }));
    this.monsters = getMonsterOwnPrincipal.body;
    const getAllMonsters: any = await firstValueFrom(this.http.get(environment.apiAdress + 'monsters', { withCredentials: true }));
    getAllMonsters.body.forEach((monster: any) => {
      this.monstersNameAndId.push({ name: `${this.capitalizeFirstLetter(monster.element)} - ${monster.name} (${monster.awekeningName})`, id: monster._id });
    });

    this.monstersNameAndId.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      }
      return 1;
    });

    console.log(this.monstersNameAndId)
    this.filterOptions(1);
    this.filterOptions(2);
    this.filterOptions(3);
  }

  filterOptions(ele: number) {
    if(ele === 1) {
      if (this.searchTerm1 === '') {
        this.filteredOptions1 = this.monstersNameAndId;
      } else {
        this.filteredOptions1 = this.monstersNameAndId.filter((option: any) =>
          option.name.toLowerCase().includes(this.searchTerm1.toLowerCase())
        );
      }
    }
    if(ele === 2) {
      if (this.searchTerm2 === '') {
        this.filteredOptions2 = this.monstersNameAndId;
      } else {
        this.filteredOptions2 = this.monstersNameAndId.filter((option: any) =>
          option.name.toLowerCase().includes(this.searchTerm2.toLowerCase())
        );
      }
    }
    if(ele === 3) {
      if (this.searchTerm3 === '') {
        this.filteredOptions3 = this.monstersNameAndId;
      } else {
        this.filteredOptions3 = this.monstersNameAndId.filter((option: any) =>
          option.name.toLowerCase().includes(this.searchTerm3.toLowerCase())
        );
      }
    }
  }

  save() {
    console.log(this.summonerSelected);
    console.log(this.power1);
    this.http.post(environment.apiAdress + 'user/info', {
      summoner: this.summonerSelected,
      power: this.summonerPower,
      monsters: [
        {
          monster: this.monster1,
          power: this.power1,
        },
        {
          monster: this.monster2,
          power: this.power2,
        },
        {
          monster: this.monster3,
          power: this.power3,
        },
      ],
    }, { withCredentials: true }).subscribe(
      (response) => {
        console.log(response);
      }
    );

  }
}
