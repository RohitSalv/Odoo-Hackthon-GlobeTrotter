// footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styles: [`
    footer {
      font-size: 0.9rem;
    }
  `]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
