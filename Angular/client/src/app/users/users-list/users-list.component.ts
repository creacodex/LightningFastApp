import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntitiesResult } from 'src/app/model/entities-result.model';
import { Users } from '../model/users.model';
import { UsersService } from '../service/users.service';
import { OkCancelModalComponent } from 'src/app/core/dialogs/ok-cancel-modal/ok-cancel-modal.component';

@Component({
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {

  formGroup: FormGroup;
  entitiesResult: EntitiesResult<Users>;
  totalRows: number;
  pages: number[];
  totalPages: number;
  public errorMessage: string;

  private index = 1;
  private page: number;

  get pageSize() { return this.formGroup.get('pageSize'); }
  get search() { return this.formGroup.get('search'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngbModal: NgbModal,
    private usersService: UsersService
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      search: [null],
      pageSize: [25]
    });

    this.route.queryParams.subscribe(p => {
      this.page = Number(p.page) || 1;
      this.pageSize.setValue(p.pageSize || 25);
      this.list(this.page, this.pageSize.value, null, null, this.search.value);
    });
  }

  private list(page: number, pageSize: number, orderBy: string, searchField: string, searchValue: string): void {
    this.usersService
      .list(page, pageSize, orderBy, true, searchField, searchValue)
      .subscribe((entitiesResult: EntitiesResult<Users>) => {
        this.entitiesResult = entitiesResult;
        this.totalRows = entitiesResult.totalRows;
        this.calculatePaging();
      },
        error => {
          console.error('List call error', error);
        });
  }

  calculatePaging(): void {
    this.totalPages = Math.ceil(this.totalRows / this.pageSize.value);
    const arrayLength = this.totalPages > 5 ? 5 : this.totalPages;
    const base = this.page - 2 <= 0 ? 1 : this.page - 2;

    if (this.page + 2 <= this.totalPages) {
      this.index = base;
    } else {
      this.index = this.totalPages - 4 <= 0 ? 1 : this.totalPages - 4;
    }

    this.pages = Array(arrayLength).fill(null).map((x, i) => i + this.index);
  }

  public searchFor(): void {
    this.list(this.page, this.pageSize.value, null, 'Name', this.search.value);
  }

  onPageSizeChange(): void {
    this.router.navigate(['./'], { queryParams: { page: 1, pageSize: this.pageSize.value }, relativeTo: this.route });
  }

  public delete(id: string): void {
    const modal = this.ngbModal.open(OkCancelModalComponent, { keyboard: true });

    modal.result.then(x => {
      this.usersService
        .delete(id)
        .subscribe(() => { },
          error => {
            this.errorMessage = error;
          },
          () => {
            this.list(this.page, this.pageSize.value, null, null, this.search.value);
          });
    }, x => { }
    );
  }
}
