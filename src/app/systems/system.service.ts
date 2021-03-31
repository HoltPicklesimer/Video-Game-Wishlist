import { System } from './system.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  systemListChangedEvent = new Subject<System[]>();
  private systems: System[] = [];

  constructor(private http: HttpClient) {
    this.fetchSystems();
  }

  getSystems(): System[] {
    return this.systems.slice().sort((a, b) => {
      if (a.wanted < b.wanted) return 1;
      if (a.wanted > b.wanted) return -1;
      if (a.have < b.have) return 1;
      if (a.have > b.have) return -1;
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  }

  getSystem(id: string) {
    return this.systems.find((c) => c.id === id);
  }

  deleteSystem(system: System) {
    if (!system) {
      return;
    }

    const pos = this.systems.findIndex((c) => c.id === system.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/systems/' + system.id)
      .subscribe((response: Response) => {
        this.systems.splice(pos, 1);
        this.sortAndSend();
      });
  }

  addSystem(system: System) {
    if (!system) {
      return;
    }

    // make sure id of the new Contact is empty
    system.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log(system);

    // add to database
    this.http
      .post<{ message: string; system: System }>(
        'http://localhost:3000/systems',
        system,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new system to systems
        this.systems.push(responseData.system);
        this.sortAndSend();
      });
  }

  updateSystem(originalSystem: System, newSystem: System) {
    if (!originalSystem || !newSystem) {
      return;
    }

    const pos = this.systems.findIndex((d) => d.id === originalSystem.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new System to the id of the old System
    newSystem.id = originalSystem.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/systems/' + originalSystem.id, newSystem, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.systems[pos] = newSystem;
        this.sortAndSend();
      });
  }

  fetchSystems() {
    this.http
      .get<System[]>('http://localhost:3000/systems')
      .subscribe((response: any) => {
        this.systems = response.systems;
        this.sortAndSend();
      });
  }

  sortAndSend() {
    this.systemListChangedEvent.next(
      this.systems.slice().sort((a, b) => {
        if (a.wanted < b.wanted) return 1;
        if (a.wanted > b.wanted) return -1;
        if (a.have < b.have) return 1;
        if (a.have > b.have) return -1;
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      })
    );
  }
}
