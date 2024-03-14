import { Option } from './option';
import { Subject } from './subject';

export interface Question {
  id: number;
  content: string;
  active: boolean;
  difficultyLevel: number;
  questionType: string;
  subject: Subject;
  rightOptions: Option[];
  options: Option[];
  optionSelected?: Option[];

  isMarkedForReview?: boolean;
}

export interface ResultTimeQuestion {
  id: number;
  content: string;
  options: Option[];
  selected_option_id?: number;
  correct_option_id?: number;
}
