import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuItem, SelectItem} from 'primeng/primeng';
import {CompanyService} from '../../services/company.service';
import {UserService} from '../../services/user.service';
import {CompletionFlag} from '../../Models/completion-flag.enum';
import {CategoryService} from '../../services/category.service';
import {ApplicationService} from '../../services/application.service';
import {UrgencyFlag} from '../../Models/urgency-flag.enum';
import * as Quill from 'quill';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SolutionsService} from '../../services/solutions.service';
import {SolutionDto} from '../../Models/solution-dto';
import {FileUpload} from 'primeng/components/fileupload/fileupload';
import {AzureService} from '../../services/azure.service';
import {IssuesService} from "../../services/issues.service";

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styles: []
})
export class IssueFormComponent implements OnInit, AfterViewInit {

  @ViewChild('description') descriptionEl: ElementRef;
  @ViewChild('solution') solutionEl: ElementRef;
  @ViewChild('tagEl') tagEl: ElementRef;
  @ViewChild('relatedFiles') relatedFilesEl: ElementRef;
  @ViewChild('emailAttachments') emailAttachmentEl: FileUpload;

  private solutionsForCurrentCategory: SolutionDto[] = [];

  // For dropdown list
  private items: Array<MenuItem>;
  private users: Array<SelectItem> = [];
  private companies: Array<SelectItem> = [];
  private completionFlags: Array<SelectItem> = [];
  private categories: Array<SelectItem> = [];
  private psUsers: Array<SelectItem> = [];
  private pslApplications: Array<SelectItem> = [];
  private urgnecyFlags: Array<SelectItem> = [];
  private stockResponses: Array<SelectItem> = [];
  private tags: SelectItem[] = [];
  private relatedfiles: FormData = new FormData();
  private attachmentFiles: FormData = new FormData();

  private selectedCompany: string;
  private selectedUser: string;
  private completionFlag: string;
  private selectedCategory: string;
  private selectedPsUser: string;
  private selectedPslApplication: string;
  private selectedUrgencyFlag: string;
  private selectedStockResponse: string;
  // End for dropdown list info

  // Editors
  private descriptionEditor: Quill.Quill;
  private solutionEditor: Quill.Quill;
  //
  private issueForm: FormGroup;
  private hideTags = true;

  private observer: MutationObserver;
  private tagsHeight: number;

  constructor(private categoryService: CategoryService,
              private companyService: CompanyService,
              private issueService: IssuesService,
              private userService: UserService,
              private appService: ApplicationService,
              private solutionsService: SolutionsService,
              private azure: AzureService,
              private fb: FormBuilder) {

    this.issueForm = this.fb.group({
      companyId: this.fb.control([]),
      usersId: this.fb.control([]),
      completionFlag: this.fb.control([]),
      categoryId: this.fb.control([]),
      psUser: this.fb.control([]),
      applications: this.fb.control([]),
      urgencyState: this.fb.control([]),
      relatedFiles: this.fb.group(this.relatedfiles),
      attachmentFiles: this.fb.group(this.attachmentFiles),
      isStockResponse: '',
      description: '',
      solution: ''
    });

  }

  ngAfterViewInit(): void {
    this.descriptionEditor = new Quill(this.descriptionEl.nativeElement, {
      theme: 'snow'
    });
    this.solutionEditor = new Quill(this.solutionEl.nativeElement, {
      theme: 'snow'
    });

    this.solutionEditor.on('text-change', () => {
      this.issueForm.patchValue({
        solution : this.solutionEl.nativeElement.innerHTML
      });
    });
    this.descriptionEditor.on('text-change', () => {
      this.issueForm.patchValue({
        description: this.descriptionEl.nativeElement.innerHTML
      });
    });

    this.observer = new MutationObserver(() => {
      this.tagsHeight = this.tagEl.nativeElement.clientHeight;
    });
    const config = { attributes: true, childList: true, characterData: true };
    this.observer.observe(this.tagEl.nativeElement, config);
  }

  ngOnInit() {

    console.log(this.relatedFilesEl);

    for (const flag in UrgencyFlag) {
      if (flag === UrgencyFlag.Important.toString()) {
        this.urgnecyFlags.push({value: UrgencyFlag.Important, label: 'Important'});
      } else if (flag === UrgencyFlag.NotImportant.toString()) {
        this.urgnecyFlags.push({value: UrgencyFlag.NotImportant, label: 'Not Important'});
      } else if (flag === UrgencyFlag.Urgent.toString()) {
        this.urgnecyFlags.push({value: UrgencyFlag.Urgent, label: 'Urgent'});
      }
    }

    this.appService.getAllPslApplications().subscribe((apps) => {
      apps.forEach(app => {
        this.pslApplications.push({value: app.id, label: app.application});
      });
    });

    this.userService.getAllPsUsers().subscribe(psUsers => {
      psUsers.forEach(psUser => {
        this.psUsers.push({value: psUser.id, label: `${psUser.firstName} ${psUser.lastName} (${psUser.email})`});
      });
      this.selectedPsUser = this.psUsers[0].label;
    });

    this.categoryService.getAllCategories().subscribe((categories) => {
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
    }
    ;

    // populate companies to show on dropdown
    this.companyService.getAllCompanies().subscribe(companies => {
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

  public getUsers(event): void {
    this.userService.getAllUsersForCompany(event.value).subscribe(users => {
      this.users = [];
      if (users) {
        users.forEach(person => {
          this.users.push({label: `${person.firstName} ${person.lastName} (${person.email})`, value: person.id});
        });
      }
    });
  }

  public uploadBlob(files) {
    this.relatedfiles.append(files['files'][0].name, files['files'][0]);
  }
  public attachFiles(files) {
    this.attachmentFiles.append(files['files'][0].name, files['files'[0]]);
  }

  public submitForm() {
    this.issueService.addIssue(this.issueForm.value);
  }

  public stockResponseCheck(event) {
    console.log(event);
  }

  public CategoryChange(event) {
    this.solutionsService.getStockResponsesForCategory(event.value).subscribe(solutions => {
      this.hideTags = false;
      this.solutionsForCurrentCategory = solutions;
      this.stockResponses = [];
      this.stockResponses.push({label: 'Select stock response', value: 'default'});
      solutions.forEach(s => {
        this.stockResponses.push({label: s.description, value: s.id});
      });
    });
  }

}
