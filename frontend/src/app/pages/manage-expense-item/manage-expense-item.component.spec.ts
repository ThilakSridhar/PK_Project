import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExpenseItemComponent } from './manage-expense-item.component';

describe('ManageExpenseItemComponent', () => {
  let component: ManageExpenseItemComponent;
  let fixture: ComponentFixture<ManageExpenseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExpenseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExpenseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
