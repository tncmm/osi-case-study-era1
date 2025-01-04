
import { HttpCodes } from '../../constant/http_codes';
import { OsiCaseStudyError } from './osi_case_study_error';

export class Unauthorized extends OsiCaseStudyError {
  constructor(message: string, errorCode?: number) {
    super(message, HttpCodes.Unauthorized, errorCode);
  }
}