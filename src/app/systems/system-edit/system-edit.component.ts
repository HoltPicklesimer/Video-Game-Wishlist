import { SystemService } from './../system.service';
import { System } from './../system.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-system-edit',
  templateUrl: './system-edit.component.html',
  styleUrls: ['./system-edit.component.css'],
})
export class SystemEditComponent implements OnInit {
  originalSystem: System;
  system: System;
  editMode: boolean = false;
  id: string;
  invalidSystem: boolean = false;

  constructor(
    private systemService: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalSystem = this.systemService.getSystem(this.id);

      if (!this.originalSystem) {
        return;
      }

      this.editMode = true;
      this.system = JSON.parse(JSON.stringify(this.originalSystem));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newSystem = new System(
      this.system?.id || '',
      value.name,
      value.description,
      value.have || false,
      value.wanted || false,
      value.imageUrl,
      value.developer
    );

    if (this.editMode) {
      this.systemService.updateSystem(this.originalSystem, newSystem);
    } else {
      this.systemService.addSystem(newSystem);
    }

    this.router.navigate(['/systems']);
  }

  onCancel() {
    this.router.navigate(['/systems']);
  }
}
