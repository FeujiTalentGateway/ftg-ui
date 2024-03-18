import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throttleTime } from 'rxjs';
import { Question } from 'src/app/models/question';
import { Subject } from 'src/app/models/subject';
import { QuestionRepository } from 'src/app/repository/question-repository.service';
import { SubjectRepositoryService } from 'src/app/repository/subject-repository.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})

/**
 * Represents the component responsible for viewing and managing questions.
 */
export class ViewQuestionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  difficultLevelList: number[] = Array.from(
    { length: 10 },
    (_, index) => index + 1
  );
  selectedLevel!: number;
  isDeleteModalOpen: boolean = false;
  delitingQuestion: string = '';
  delitableQuestionId: number = 0;
  addExtraStyle: boolean = false;
  pageSize = 5;
  page = 1;
  totalQuestion: any;
  rows = 5;
  options = [0, 5, 15, 20];
  searchQuestion = '';
  subjects: Subject[] = [];
  questions: Question[] = [];
  selectedSubject!: number;
  searchQuery: string = '';
  subjectsSubscription: Subscription = new Subscription();
  quesitonSubscirption: Subscription = new Subscription();
  isDropdownOpen: boolean[] = [];
  questionsList: Question[] = [];
  questionsLength: number = 0;

  /**
   * Constructs a new instance of the ViewQuestionsComponent.
   * @param service - The QuestionsService used for retrieving questions.
   * @param questionRepository - The QuestionRepository used for managing question data.
   * @param subjectRepository - The SubjectRepositoryService used for managing subject data.
   * @param activatedRoute - The ActivatedRoute used for retrieving route parameters.
   */
  constructor(
    private service: QuestionsService,
    private questionRepository: QuestionRepository,
    private subjectRepository: SubjectRepositoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.isDropdownOpen = Array(this.questions.length).fill(false);
  }

  /**
   * Initializes the component and sets up initial values and subscriptions.
   */
  ngOnInit(): void {
    this.selectedLevel = 0;
    this.selectedSubject = 0;
    this.service.questionChanged$.subscribe(() => {
      this.handleFiltering();
    });
    this.subjectsSubscription = this.subjectRepository
      .getAllSubjectsByActiveStatus(true)
      .subscribe(
        (subjects: Subject[]) => {
          this.subjects = subjects;
          console.log(this.subjects);
          if (subjects.length > 0) {
            console.log(this.selectedSubject);
            if (this.selectedSubject == 0) {
              console.log(this.selectedSubject);
              this.selectedSubject = subjects[0].id;
            }
            this.handleFiltering();
          }
        },
        (error) => {
          console.error('Error fetching subjects:', error);
        }
      );
  }

  /**
   * Retrieves questions based on the selected page size.
   * If a difficulty level is selected, filters the questions based on the selected subject, difficulty level, page, and page size.
   * If a search query is provided, filters the questions based on the search query.
   * Otherwise, retrieves all questions based on the selected subject, page, and page size.
   */
  getQuestionsBasedOnPageSize() {
    if (this.selectedLevel !== 0) {
      this.questionRepository
        .filterQuestionsBasedOnDifficultyLevel(
          this.selectedSubject,
          this.selectedLevel,
          this.page,
          this.pageSize
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.questionsList = response.results;
            this.questionsLength = response.count;
          },
          (error) => {
            console.error('Error fetching questions:', error);
          }
        );
    } else if (this.searchQuery) {
      this.getFilteredQuestionsBasedonSearchQuery();
    } else
      this.questionRepository
        .getAllQuestionsBySubjectId(
          this.selectedSubject,
          this.page,
          this.pageSize
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.questionsList = response.results;
            this.questionsLength = response.count;
          },
          (error) => {
            console.error('Error fetching questions:', error);
          }
        );
  }
  /**
   * Retrieves all questions based on the selected subject ID.
   */
  getAllQuestionsBasedOnSubjectId() {
    this.page = 1;
    this.pageSize = 5;
    if (this.selectedLevel == 0) {
      this.quesitonSubscirption = this.questionRepository
        .getAllQuestionsBySubjectId(
          this.selectedSubject,
          this.page,
          this.pageSize
        )
        .subscribe((response) => {
          console.log(response.results);
          this.questionsList = response.results;
          this.questionsLength = response.count;
          console.log(response);
          if (this.paginator != undefined) {
            this.paginator.pageIndex = 0;
          }
          this.searchQuery = '';
        });
    } else {
      this.quesitonSubscirption = this.questionRepository
        .getAllQuestionsBySubjectId(
          this.selectedSubject,
          this.page,
          this.pageSize
        )
        .subscribe((response) => {
          console.log(response.results);
          this.questionsList = response.results;
          this.questionsLength = response.count;
          this.selectedLevel = 0;
          console.log(response);
          this.searchQuery = '';
        });
    }
  }
  /**
   * Retrieves filtered questions based on the selected subject, difficulty level, page, and page size.
   */
  getFilteredQuestionsBasedOnDifficultyLevel() {
    this.page = 1;
    this.pageSize = 5;
    this.questionRepository
      .filterQuestionsBasedOnDifficultyLevel(
        this.selectedSubject,
        this.selectedLevel,
        this.page,
        this.pageSize
      )
      .subscribe(
        (response) => {
          console.log(response);
          console.log(response.results);
          this.questionsList = response.results;
          this.questionsLength = response.count;
          if (this.paginator != undefined) {
            this.paginator.pageIndex = 0;
          }
        },
        (error) => {
          console.error('Error fetching filtered questions:', error);
        }
      );
  }
  /**
   * Retrieves filtered questions based on the selected difficulty level and search query.
   */
  getFilteredQuestionsBasedonDifficultyLevelWithSearchQuery() {
    this.page = 1;
    this.pageSize = 5;
    const lowercaseSearchQuery = this.searchQuery.toLowerCase();
    this.questionRepository
      .filterQuestionsBasedOnDifficultyLevelWithSearchQuery(
        this.selectedSubject,
        this.selectedLevel,
        this.page,
        this.pageSize,
        lowercaseSearchQuery
      )
      .subscribe(
        (response) => {
          console.log(response);
          console.log(response.results);
          this.questionsList = response.results;
          this.questionsLength = response.count;
          if (this.paginator != undefined) {
            this.paginator.pageIndex = 0;
          }
        },
        (error) => {
          console.error('Error fetching filtered questions:', error);
        }
      );
  }
  /**
   * Retrieves filtered questions based on the search query.
   */
  getFilteredQuestionsBasedonSearchQuery() {
    const lowercaseSearchQuery = this.searchQuery.toLowerCase();
    this.questionRepository
      .filterQuestionsBasedOnSearchQuery(
        this.selectedSubject,
        this.page,
        this.pageSize,
        lowercaseSearchQuery
      )
      .subscribe(
        (response) => {
          console.log(response);
          console.log(response.results);
          this.questionsList = response.results;
          this.questionsLength = response.count;
          this.pageSize = 5;
        },
        (error) => {
          console.error('Error fetching filtered questions:', error);
        }
      );
  }

  /**
   * Handles the filtering of questions based on the selected level and search query.
   */
  handleFiltering() {
    if (this.selectedLevel !== 0 && this.searchQuery) {
      this.getFilteredQuestionsBasedonDifficultyLevelWithSearchQuery();
    } else if (this.selectedLevel !== 0) {
      this.getFilteredQuestionsBasedOnDifficultyLevel();
    } else if (this.searchQuery) {
      this.getFilteredQuestionsBasedonSearchQuery();
    } else {
      this.getAllQuestionsBasedOnSubjectId();
    }
  }

  /**
   * Handles the page change event.
   * @param event - The page change event object.
   */
  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getQuestionsBasedOnPageSize();
  }

  /**
   * Deletes a question with the specified ID.
   * @param id - The ID of the question to delete.
   */
  deleteQuestion(id: any) {
    this.delitableQuestionId = id;
    this.openDeleteModal();
    this.delitingQuestion = 'Are you sure you want to delete this question';
  }

  /**
   * Opens the delete modal.
   */
  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  /**
   * Deletes the question after confirmation.
   */
  deleteQuestionAfterConfirmation() {
    this.service.deleteQuestion(this.delitableQuestionId);
    this.closeDeleteModal();
  }

  /**
   * Closes the delete modal.
   */
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * It is used to perform any necessary cleanup tasks before the component is removed from the DOM.
   */
  ngOnDestroy(): void {
    this.subjectsSubscription.unsubscribe();
    this.quesitonSubscirption.unsubscribe();
  }

  /**
   * Checks if the given option is one of the right options for the question.
   * @param option - The option to check.
   * @param question - The question object.
   * @returns A boolean value indicating whether the option is one of the right options for the question.
   */
  setRightOptionOrNot(option: any, question: Question): Boolean {
    let optionFound = question.rightOptions?.find(
      (opt) => opt.id === option.id
    );

    if (optionFound) {
      return true;
    }
    return false;
  }

  /**
   * Toggles the dropdown state for a specific index.
   * If the dropdown is closed, it will open it. If the dropdown is open, it will close it.
   *
   * @param index - The index of the dropdown to toggle.
   */
  toggleDropdown(index: number) {
    if (!this.isDropdownOpen[index]) {
      this.isDropdownOpen = Array(this.questions.length).fill(false);
      this.isDropdownOpen[index] = !this.isDropdownOpen[index];
    } else {
      this.isDropdownOpen[index] = !this.isDropdownOpen[index];
    }
  }

  /**
   * Returns the CSS class based on the level.
   * @param level - The level of the button.
   * @returns The CSS class corresponding to the level.
   */
  getStatusButtonClass(level: number): string {
    switch (level) {
      case 1:
        return 'level-1';
      case 2:
        return 'level-2';
      case 3:
        return 'level-3';
      case 4:
        return 'level-4';
      case 5:
        return 'level-5';
      case 6:
        return 'level-6';
      case 7:
        return 'level-7';
      case 8:
        return 'level-8';
      case 9:
        return 'level-9';
      case 10:
        return 'level-10';

      default:
        return 'common-level';
    }
  }
}
