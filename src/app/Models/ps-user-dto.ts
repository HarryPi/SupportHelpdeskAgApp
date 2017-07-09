import {IssueDto} from "./issue-dto";
export class PsUserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  note: string;
  issues: Array<IssueDto>;
}
