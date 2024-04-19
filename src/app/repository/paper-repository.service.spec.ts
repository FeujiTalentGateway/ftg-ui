import { TestBed } from '@angular/core/testing';

import { PaperRepositoryService } from './paper-repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('PaperRepositoryService', () => {
  let service: PaperRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule] 
    });
    service = TestBed.inject(PaperRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
