import { Pipe, PipeTransform } from '@angular/core';
import { System } from './system.model';

@Pipe({
  name: 'systemsFilter',
})
export class SystemsFilterPipe implements PipeTransform {
  transform(systems: System[], term: string): any {
    let result: System[] = [];

    if (term && term.length > 0) {
      result = systems.filter((system: System) => {
        return system.name.toLowerCase().includes(term.toLowerCase());
      });
    }

    return result.length < 1 ? systems : result;
  }
}
