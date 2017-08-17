import {Person} from "./person";

export class Company {
  id: number;
  name: string;
  portalId: number;
  people: Array<Person>;
}
