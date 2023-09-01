import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMasterMainComponent } from './invoice-master-main.component';

describe('InvoiceMasterMainComponent', () => {
  let component: InvoiceMasterMainComponent;
  let fixture: ComponentFixture<InvoiceMasterMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceMasterMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceMasterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
