import { IGame } from '../models/IGame';
import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';
import { IFetchedGame } from '../models/IFetchedGame';

class Store {
  games: IGame[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // dev
  initStore() {
    this.games = [
      {
        id: '1',
        name: '1',
        iconUrl: '1',
      },
      {
        id: '2',
        name: '2',
        iconUrl: '2',
      },
      {
        id: '3',
        name: '3',
        iconUrl: '3',
      },
    ];
  }

  // dev
  setGames(games: any) {
    this.games = games;
  }

  fetch() {
    fetch('https://api.npoint.io/817eebf87e3033d5dc99')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.games = json.data.map((fetchedGame: IFetchedGame) => {
          return ({
            id: nanoid(),
            name: fetchedGame.name,
            iconUrl: fetchedGame.icon_url,
          })
        });
      });
  }
}

export default new Store();
