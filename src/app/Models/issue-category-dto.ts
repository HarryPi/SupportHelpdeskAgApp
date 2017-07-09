import {IssueTagsDto} from "./issue-tags-dto";

export class IssueCategoryDto {

  id: number;
  description: string;
  issueTagsDtos: Array<IssueTagsDto>

}
