import {IssueTags} from "./issue-tags";

export class IssueCategory {

  id: number;
  description: string;
  issueTagsDtos: Array<IssueTags>;

}
