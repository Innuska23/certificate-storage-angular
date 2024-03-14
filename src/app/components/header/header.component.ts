import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="py-4 px-6 flex mb-4 bg-gradient-to-r from-gray-100 to-slate-400">
      <h1 class="text-4xl font-bold tracking-tight text-dark flex-grow text-right"
          [ngStyle]="{ 'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.2)' }">
        Certificate Storage App
      </h1>
    </header>
  `,
  styles: []
})
export class HeaderComponent { }
