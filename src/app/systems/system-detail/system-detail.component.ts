import { SystemService } from './../system.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { System } from '../system.model';

@Component({
  selector: 'app-system-detail',
  templateUrl: './system-detail.component.html',
  styleUrls: ['./system-detail.component.css'],
})
export class SystemDetailComponent implements OnInit {
  system: System;

  constructor(
    private systemService: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.system = this.systemService.getSystem(id);
    });
  }

  onDelete() {
    this.systemService.deleteSystem(this.system);
    this.router.navigate(['/systems'], { relativeTo: this.route });
  }
}
