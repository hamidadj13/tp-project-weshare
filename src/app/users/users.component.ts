import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  implements OnInit {
  users: any[] = [];
  displayedUsers: any[] = [];
  pageSize = 3;
  pageSizeOptions = [3, 6, 9, 12];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.updateDisplayedUser(0, this.pageSize);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.updateDisplayedUser(startIndex, event.pageSize);
  }

  private updateDisplayedUser(startIndex: number, pageSize: number) {
    this.displayedUsers = this.users.slice(startIndex, startIndex + pageSize);
  }
}
