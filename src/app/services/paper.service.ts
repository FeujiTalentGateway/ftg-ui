import { Injectable } from '@angular/core';
import { PaperRepositoryService } from '../repository/paper-repository.service';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { Question } from '../models/question';
import { Paper } from '../models/paper';

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  constructor(private paperrepo: PaperRepositoryService) { }

  getAllSubjects(): Observable<Subject[]> {
    return this.paperrepo.getAllSubjects();
  }

  getAllQuestions(): Observable<Question[]> {
    return this.paperrepo.getAllQuestions();
  }

  savePaper(Paper: Paper): Observable<Paper> {
    return this.paperrepo.savePaper(Paper);
  }
  getAllPapers(): Observable<Paper[]> {
    return this.paperrepo.getAllPapers();
  }
  updatePaper(paper:Paper):Observable<Paper>{
    return this.paperrepo.updatePaper(paper);
  }





}
