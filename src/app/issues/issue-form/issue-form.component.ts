import {Component, OnInit} from "@angular/core";
import {MenuItem, SelectItem} from "primeng/primeng";
import {CompanyDto} from "../../Models/company-dto";
import {CompanyService} from "../../services/company.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styles: []
})
export class IssueFormComponent implements OnInit {

  private items: Array<MenuItem>;
  private users: Array<SelectItem> = [];
  private companies: Array<SelectItem> = [];
  private selectedCompany: string;
  private selectedUser: string;


  constructor(private companyService: CompanyService, private userService: UserService) {
  }
  ngOnInit() {
    //populate companies to show on dropdown
    this.companyService.allCompanies.then(companies => {
      companies.forEach(c => {
        this.companies.push({label: c.name, value: c.id})
        if(c.name.toLowerCase().includes('presentation')){
          this.selectedCompany = c.name
        }
      });
    });
    this.items = [
      {
        label: 'Email Functions',
        items: [
          {
            label: 'Make stock response',
            icon: 'fa-plus'
          },
          {
            label: 'Do not make stock response',
            icon: 'fa-minus'
          }]
      },
      {
        label: 'Email Response Functions',
        items: [
          {
            label: 'Send Response Email',
            icon: 'fa-mail-forward'
          },
          {
            label: 'Preview Email',
            icon: 'fa-envelope-o',
          },
          {
            label: 'Edit Email',
            icon: 'fa-edit'
          }
        ]
      }
    ];
  }
  getUsers(event): void {
    this.userService.getAllUsersForCompany(event.value).then(c =>{
      this.users = [];
      c.personDtos.forEach(person => {
        this.users.push({label: `${person.firstName} ${person.lastName} (${person.email})`, value: person.id})
      });
    });
  }

}
