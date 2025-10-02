import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:10px; border:1px solid white; margin-top:20px;">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
    </div>
  `,
})
export class HomeComponent {
  @Input() title = 'Angular Remote: HomeComponent';
  @Input() message = 'This is the HomeComponent from the Angular remote application.';
}
