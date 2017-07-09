import {PslApplicationDto} from "./psl-application-dto";
import {SolutionDto} from "./solution-dto";
import {PsUserDto} from "./ps-user-dto";
import {EmailDto} from "./email-dto";
import {IssueCategoryDto} from "./issue-category-dto";
import {PersonDto} from "./person-dto";
import {IssueTagsDto} from "./issue-tags-dto";

export class IssueDto {
  id: number;
  description: string;
  note: string;
  personId: Array<number>;
  applicationName: Array<string>;
  attachedFiles: Array<string>;
  urgencyFlag: number;
  completionFlag: number;
  completionDuration: number;


  completionDate?: Date;
  dateIssueRegistered?: Date;
  lastUpdate?: Date;

  pslApplicationDto: Array<PslApplicationDto>;
  solutionDto: SolutionDto;
  psUser: PsUserDto;
  emailDto: EmailDto;
  category: IssueCategoryDto;
  personDtos: Array<PersonDto>;
  issueTags: Array<IssueTagsDto>;
  issueTagsId: Array<number>;
  companyId: number;
  categorieId: number;
  psUserId: number;


}
