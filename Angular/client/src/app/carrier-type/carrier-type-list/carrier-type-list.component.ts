import { Component, OnInit, Directive, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntitiesResult } from 'src/app/model/entities-result.model';
import { CarrierType } from '../model/carrier-type.model';
import { CarrierTypeService } from '../service/carrier-type.service';
import { OkCancelModalComponent } from 'src/app/core/dialogs/ok-cancel-modal/ok-cancel-modal.component';

export type SortColumn = keyof CarrierType | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': 'asc', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  templateUrl: './carrier-type-list.component.html',
  styleUrls: ['./carrier-type-list.component.css'],
})
export class CarrierTypeListComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  public formGroup: FormGroup;
  public errorMessage: string;
  public entitiesResult: EntitiesResult<CarrierType>;
  public totalRows: number;
  public column: string = '';
  public ascending: boolean = true;

  public page: number = 1;
  public pageSize: number = 25;

  get search() { return this.formGroup.get('search'); }

  constructor(
    private fb: FormBuilder,
    private ngbModal: NgbModal,
    private carrierTypeService: CarrierTypeService
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      search: [''],
    });

    this.loadData();
  }

  public onSubmit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.carrierTypeService
      .list(this.page, this.pageSize, this.column, this.ascending, '', this.search.value)
      .subscribe((entitiesResult: EntitiesResult<CarrierType>) => {
        this.entitiesResult = entitiesResult;
        this.totalRows = entitiesResult.totalRows;
      },
      (error) => { this.errorMessage = error; });
  }

  public searchFor(): void {
    this.loadData();
  }

  public clear(): void {
    this.formGroup.get('search').patchValue('');
    this.loadData();
  }

  public onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.column = column;
    this.ascending = direction === 'asc' ? true : false;

    this.loadData();
  }

  public onPageSizeChange(): void {
    this.loadData();
  }

  public onPagerChange(): void {
    this.loadData();
  }

  public delete(id: string): void {
    const modal = this.ngbModal.open(OkCancelModalComponent, { keyboard: true });

    modal.result.then(x => {
      this.carrierTypeService
        .delete(id)
        .subscribe(() => { },
          error => { this.errorMessage = error; },
          () => { this.loadData(); });
    },
    x => { }
    );
  }
}
