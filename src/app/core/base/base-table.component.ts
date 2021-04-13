import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent } from './base.component';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable, of } from 'rxjs';
import { OptionsPage } from '../models/server/options-page';

@Component({
  template: ''
})
export abstract class BaseTableComponent<T> extends BaseComponent implements OnInit {
  elementsPage = [5, 10, 25, 100];
  totalElements = 0;
  displayedColumns: String[];
  formGroup: FormGroup;
  data$: Observable<T[]> = of([]);
  protected entityFilter: T;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  protected constructor(
    protected translateService: TranslateService
  ) {
    super(translateService);
    this.displayedColumns = this.initColumns();
  }

  ngOnInit() {
    super.ngOnInit();
    this.cleanFilters();
    this.data$ = this.loadData();
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      merge(
        this.paginator?.page,
        this.sort?.sortChange
      ).subscribe(res => {
        this.loadData(this.getOptions());
      })
    );
  }

  protected abstract initColumns(): String[];

  protected abstract loadData(options?: OptionsPage): Observable<T[]>;

  protected abstract initFilter(): T;

  protected abstract filter(): void;

  protected abstract initFormGroup(): FormGroup;

  protected getOptions(): OptionsPage {
    const options = new OptionsPage();
    options.createOptionsSearch(this.paginator, this.sort);
    return options;
  }

  cleanFilters(): void {
    this.entityFilter = this.initFilter();
    this.formGroup = this.initFormGroup();
    this.data$ = this.loadData();
  }
}
