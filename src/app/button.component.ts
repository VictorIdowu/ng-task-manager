import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `<button class="ui basic button" (click)="goToForm()">
    <i class="plus icon teal"></i>
    Add New Task
  </button>`,
  styles: '',
})
export class Button {
  constructor(private router: Router) {}
  goToForm() {
    this.router.navigate(['/form']);
  }
}
