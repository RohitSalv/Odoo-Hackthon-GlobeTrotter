import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from "../reuse/header/header";
import { TripListComponent } from "../trip-list/trip-list";
import { RouterModule } from '@angular/router';
import { AiLinksComponent } from "../reuse/ailinks/ailinks";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, TripListComponent, RouterModule, AiLinksComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  backgroundImage =
    'https://readdy.ai/api/search-image?query=Breathtaking%20travel%20destination%20panorama%20with%20mountains%2C%20pristine%20lakes%2C%20adventure%20travelers%20exploring%20scenic%20landscape%2C%20golden%20hour%20lighting%20creating%20warm%20atmosphere%2C%20inspiring%20wanderlust%20and%20exploration%20spirit%2C%20professional%20travel%20photography%20with%20stunning%20natural%20beauty&width=1920&height=800&seq=hero1&orientation=landscape';

}
