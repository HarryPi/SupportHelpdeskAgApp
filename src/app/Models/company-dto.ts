import {PersonDto} from "./person-dto";
export class CompanyDto {
  id: number;
  name: string;
  portalId: number;
  personDtos: Array<PersonDto>;
}
