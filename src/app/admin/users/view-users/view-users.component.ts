import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { AuthRepositoryService } from 'src/app/repository/auth-repository.service';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {

  constructor(
    private service: AuthRepositoryService
  ) {}


  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = [
    'SNO',
    'firstName',
    'lastName',
    'userName',
    'emailId',
    'active'
  ];

    // Data source for MatTable
    dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


    // Method to filter data based on user input
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    getUsers() {
      // this.ngAfterViewInit();
      this.service.getUserByRoleName('USER').subscribe(
        (user) => {
          console.log(user);
          
          const reversedData = user.slice().reverse(); // Create a copy of the array before reversing
          this.dataSource = new MatTableDataSource(reversedData);
  
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    }

    getStatusButtonClass(status: boolean): string {
      return status ? 'status-button active' : 'status-button in-active';
    }

}
