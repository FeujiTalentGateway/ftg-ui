import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'src/app/models/subject';
import { SubjectRepositoryService } from 'src/app/repository/subject-repository.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-edit-subject',
  templateUrl: './add-edit-subject.component.html',
  styleUrls: ['./add-edit-subject.component.css'],
})
export class AddEditSubjectComponent {
  subject: Subject = {
    id: 0,
    active: true,
    name: '',
  };

  subjectId: any;
  isFormSubmitted: boolean = false;
  subjectForm!: FormGroup;
  isEditModalOpen: boolean = false;
  editingSubject!: string;
  editableSubjectId!: number;
  constructor(
    private questionService: SubjectService,
    private snackBarService: SnackBarService,
    private subjectRepository: SubjectRepositoryService,
    @Inject(MAT_DIALOG_DATA) public doalogData: any
  ) {}

  ngOnInit(): void {
    this.subjectId = this.doalogData.id;
    this.initialiseSubjectForm();
    if (this.subjectId) {
      this.subjectRepository.getSubjectById(this.subjectId).subscribe({
        next: (value: Subject) => {
          this.subject = value;
          this.setSubjectValueIntoSubjectForm(this.subject);
        },
        error: (error) => {
          this.snackBarService.openSnackBar(error.error.message);
        },
      });
    }
    console.log(this.subjectId);
  }

  //subject form

  initialiseSubjectForm() {
    this.subjectForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      active: new FormControl(true, Validators.required),
    });
  }

  //set value to update subject
  setSubjectValueIntoSubjectForm(subject: Subject) {
    console.log(subject);
    this.subjectForm.patchValue({
      id: subject.id,
      name: subject.name,
      active: subject.active,
    });
  }

  onSubmit() {
    console.log(this.subjectForm.value);
    this.isFormSubmitted = true;
    if (this.subjectForm.valid) {
      this.subject.name = this.subjectForm.value.name;
      this.subject.id = this.subjectForm.value.id;
      if (this.subjectId) {
        console.log(this.subject);
        this.editSubject(this.subject);
      } else {
        console.log(this.subject);
        this.questionService.addSubject(this.subject);
      }
    }
  }

  editSubject(quesion: Subject) {
    this.editableSubjectId = quesion.id;
    this.openEditModal();
    this.editingSubject = 'Are you sure you want to edit this subject';
  }
  editSubjectAfterConfirmation() {
    this.questionService.editSubject(this.subject);
    this.closeEditModal();
  }
  openEditModal() {
    this.isEditModalOpen = true;
  }
  closeEditModal() {
    this.isEditModalOpen = false;
  }
}
