import {Issue} from "./issue";

export class PsUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  note: string;
  issues: Array<Issue>;
}
