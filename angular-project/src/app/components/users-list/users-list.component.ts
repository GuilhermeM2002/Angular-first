import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  providers: [DataService],  // This component depends on DataService.
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  private dataService = inject(DataService);
  private usersSignal = signal<any[]>([]);

  users = computed(() => this.usersSignal());

  constructor() { 
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.dataService.getUsers().subscribe((data: any[]) => {
      this.usersSignal.set(data);
    });
  }
}
