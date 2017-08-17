import {Issue} from "./issue";

export class AttachedFiles {
  public id: number;
  public name: string;
  public issueId: number;

  public issue: Issue;
}
