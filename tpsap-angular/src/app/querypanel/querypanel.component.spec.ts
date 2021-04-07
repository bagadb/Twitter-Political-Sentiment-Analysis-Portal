import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerypanelComponent } from './querypanel.component';

describe('QuerypanelComponent', () => {
  let component: QuerypanelComponent;
  let fixture: ComponentFixture<QuerypanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuerypanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerypanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
