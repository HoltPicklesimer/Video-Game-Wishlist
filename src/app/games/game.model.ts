import { System } from './../systems/system.model';
export class Game {
  constructor(
    public id: string,
    public name: string,
    public wanted: boolean,
    public have: boolean,
    public description: string,
    public imageUrl: string,
    public developer: string,
    public genre: string,
    public systems: System[]
  ) {}
}
