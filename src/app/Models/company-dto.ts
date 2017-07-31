import {PersonDto} from './person-dto';

export class CompanyDto {
  id: number;
  name: string;
  portalId: number;
  people: Array<PersonDto>;
}
