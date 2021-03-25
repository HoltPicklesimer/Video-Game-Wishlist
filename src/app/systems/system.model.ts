export class System {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public have: boolean,
    public wanted: boolean,
    public imageUrl: string,
    public developer: string
  ) {}
}
