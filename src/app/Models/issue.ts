import {PslApplication} from './psl-application';
import {Solution} from './solution';
import {Person} from './person';
import {IssueTags} from './issue-tags';
import {AttachedFiles} from './attached-files';

export class Issue {
  public id: number;
  public description: string;
  public note: string;
  public urgencyFlag: number;
  public completionFlag: number;
  public categorieId: number;
  public psUserId?: number;
  public solutionId: number;
  public companyId: number;

  public solution: Solution;
  public persons: Person[];
  public issuePslApplications: PslApplication[];
  public attachedFiles: AttachedFiles[];
  public issueTags: IssueTags[];
}
