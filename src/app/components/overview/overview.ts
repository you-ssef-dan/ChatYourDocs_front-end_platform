import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})
export class Overview {
  // Optional: expose inputs to receive dynamic values from Dashboard
  @Input() usersCount: number | null = null;
  @Input() chatbotsCount: number | null = null;
  @Input() documentsCount: number | null = null;

}
