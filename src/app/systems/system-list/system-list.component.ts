import { SystemService } from './../system.service';
import { Component, OnInit } from '@angular/core';
import { System } from '../system.model';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.css'],
})
export class SystemListComponent implements OnInit {
  systems: System[] = [];
  term: string = '';

  constructor(private systemService: SystemService) {}

  ngOnInit(): void {
    this.systems = this.systemService.getSystems();

    this.systemService.systemListChangedEvent.subscribe((systems: System[]) => {
      this.systems = systems;
    });
  }

  search(value: string) {
    this.term = value;
  }
}
