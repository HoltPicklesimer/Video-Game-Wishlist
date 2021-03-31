import { System } from './../system.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-item',
  templateUrl: './system-item.component.html',
  styleUrls: ['./system-item.component.css'],
})
export class SystemItemComponent implements OnInit {
  @Input() system: System;

  constructor() {}

  ngOnInit(): void {}
}
