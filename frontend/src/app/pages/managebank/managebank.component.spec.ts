import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebankComponent } from './managebank.component';

describe('ManagebankComponent', () => {
  let component: ManagebankComponent;
  let fixture: ComponentFixture<ManagebankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagebankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
