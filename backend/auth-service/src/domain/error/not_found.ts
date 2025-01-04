import { HttpCodes } from '../../constant/http_codes';
import { OsiCaseStudyError } from './osi_case_study_error';

export class NotFound extends OsiCaseStudyError {
  constructor(message: string, errorCode?: number) {
    super(message, HttpCodes.NotFound, errorCode);
  }
}