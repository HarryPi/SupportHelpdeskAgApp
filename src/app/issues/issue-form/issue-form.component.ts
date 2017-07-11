import {Component, OnInit} from '@angular/core';
import {MenuItem, SelectItem} from 'primeng/primeng';
import {CompanyDto} from '../../Models/company-dto';
import {CompanyService} from '../../services/company.service';
import {UserService} from '../../services/user.service';
import {CompletionFlag} from '../../Models/completion-flag.enum';
import {CategoryService} from '../../services/category.service';
import {IssueCategoryDto} from '../../Models/issue-category-dto';
import {ApplicationService} from "../../services/application.service";

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styles: []
})
export class IssueFormComponent implements OnInit {

  private items: Array<MenuItem>;

  private users: Array<SelectItem> = [];
  private companies: Array<SelectItem> = [];
  private completionFlags: Array<SelectItem> = [];
  private categories: Array<SelectItem> = [];
  private psUsers: Array<SelectItem> = [];
  private pslApplications: Array<SelectItem> = [];

  private selectedCompany: string;
  private selectedUser: string;
  private completionFlag: string;
  private selectedCategory: string;
  private selectedPsUser: string;
  private selectedPslApplication: string;

  constructor(private categoryService: CategoryService,
              private companyService: CompanyService,
              private userService: UserService,
              private appService: ApplicationService
  ) {}
  ngOnInit() {
    this.appService.getAllPslApplications.then((apps) => {
      apps.forEach(app => {
        this.pslApplications.push({value: app.id, label: app.application});
      });
      this.selectedPslApplication = this.pslApplications[0].label;
    });

    this.userService.getAllPsUsers.then(psUsers => {
      psUsers.forEach(psUser => {
        this.psUsers.push({value: psUser.id, label: `${psUser.firstName} ${psUser.lastName} (${psUser.email})`});
      });
      this.selectedPsUser = this.psUsers[0].label;
    });

    this.categoryService.getAllCategories.then((categories) => {
      categories.forEach((category) => {
        this.categories.push({value: category.id, label: category.description});
      });
      this.selectedCategory = this.categories[0].label;
    });

    for (const flag in CompletionFlag) {
      if (flag === CompletionFlag.Closed.toString()) {
        this.completionFlags.push({value: CompletionFlag.Closed, label: 'Closed'});
      } else if (flag === CompletionFlag.Completed.toString()) {
        this.completionFlags.push({value: CompletionFlag.Completed, label: 'Completed'});
      } else if (flag === CompletionFlag.InProgress.toString()) {
        this.completionFlags.push({value: CompletionFlag.InProgress, label: 'In Progress'});
      } else if (flag === CompletionFlag.NotCompleted.toString()) {
        this.completionFlags.push({value: CompletionFlag.NotCompleted, label: 'Not Completed'});
      } else if (flag === CompletionFlag.NotResolved.toString()) {
        this.completionFlags.push({value: CompletionFlag.NotResolved, label: 'Not Resolved'});
      }
    };

    // populate companies to show on dropdown
    this.companyService.getAllCompanies.then(companies => {
      companies.forEach(c => {
        this.companies.push({label: c.name, value: c.id});
      });
      this.selectedCompany = this.companies[0].label;
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
    this.userService.getAllUsersForCompany(event.value).then(c => {
      this.users = [];
      c.personDtos.forEach(person => {
        this.users.push({label: `${person.firstName} ${person.lastName} (${person.email})`, value: person.id});
      });
    });
  }

}
