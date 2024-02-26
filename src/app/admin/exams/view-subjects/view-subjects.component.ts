import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription, empty } from 'rxjs';
import { Subject } from 'src/app/models/subject';
import { SubjectRepositoryService } from 'src/app/repository/subject-repository.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-all-subjects',
  templateUrl: './view-subjects.component.html',
  styleUrls: ['./view-subjects.component.css'],
})
export class ViewSubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  isDeleteModalOpen: boolean = false;
  subjectsSubscription: Subscription = new Subscription();
  displayedColumns: string[] = ['serialNumber', 'name', 'action'];
  modifyingMessage: string = '';
  dataSource = new MatTableDataSource(this.subjects);
  dataSourceWithSerial: any[] = [];
  toggleValue: boolean = true;
  isSubjectActivable: boolean = false;
  isSubjectDeActivable: boolean = false;
  modalHeader: string = 'Delete Subject';
  activableSubject!: Subject;
  activableSubjectId!: number;
  deActivableSubjectId!: number;
  deActivableSubject!: Subject;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private subjectRepository: SubjectRepositoryService,
    private subjectService: SubjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllSubjects();
    this.subjectService.subjectChanged$.subscribe(() => {
      console.log('Refreshing....');
      this.getAllSubjects();
    });
  }
  toggle(value:boolean){
    this.toggleValue=value;
    console.log(this.toggleValue);
    this.getAllSubjects();
  }

  getAllSubjects() {
    console.log(this.toggleValue);
    this.subjectsSubscription = this.subjectService
      .getUnSubscribedSubjectsByActiveStatus(this.toggleValue)
      .subscribe({
        next: (subjects: Subject[]) => {
          this.subjects = subjects.map((subject, index) => ({
            ...subject,
            serialNumber: index + 1,
          }));
          // console.log('refreshing.......');
          // Initialize MatTableDataSource with the data
          this.dataSource = new MatTableDataSource(this.subjects);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          // Handle error if needed
          console.error('Error fetching subjects:', error);
        },
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSubject(row: Subject) {
    if (!row.active) {
      console.log('delete subject');
      this.deActivableSubjectId = row.id;
      this.isSubjectDeActivable = true;
      this.deActivableSubject = row;
      this.modalHeader = 'Deactivate Subject';
      this.openDeleteModal();
      this.modifyingMessage =
        'Are you sure you want to deactivate this subject';
    }
  }

  updateSubjectActiveStatus(row: Subject) {
    if (row.active) {
      this.activableSubject = row;
      this.isSubjectActivable = true;
      this.activableSubjectId = row.id;
      this.modalHeader = 'Activate Subject';
      this.openDeleteModal();
      this.modifyingMessage =
        'Are you sure you want to make this subject active';
    }
  }
  deleteSubjectAfterConfirmation() {
    if (this.isSubjectActivable) {
      console.log('update status');
      this.subjectService.activateSubject(this.activableSubjectId);
      this.isSubjectActivable = false;
    } else if (this.isSubjectDeActivable) {
      this.subjectService.deleteSubject(this.deActivableSubjectId);
      this.isSubjectDeActivable = false;
    }
    this.closeDeleteModal();
  }
  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }
  closeDeleteModal() {
    if (this.isSubjectActivable) {
      this.activableSubject.active = false;
    } else if (this.isSubjectDeActivable) {
      this.deActivableSubject.active = true;
    }
    this.isDeleteModalOpen = false;
  }
  openAddSubjectModel() {
    this.openEditSubjectModel(NaN);
  }
  openEditSubjectModel(id: number) {
    this.subjectService.openEditSubjectModel(id);
  }
  ngOnDestroy(): void {
    this.subjectsSubscription.unsubscribe();
  }
}
