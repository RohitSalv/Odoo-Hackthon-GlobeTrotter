import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../../features/reuse/header/header';

@Component({
  selector: 'app-travelplanner',
  imports: [RouterModule,Header],
  templateUrl: './travelplanner.html',
  styleUrl: './travelplanner.css'
})
export class Travelplanner {

}
