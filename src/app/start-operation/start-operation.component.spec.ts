import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartOperationComponent } from './start-operation.component';

describe('StartOperationComponent', () => {
  let component: StartOperationComponent;
  let fixture: ComponentFixture<StartOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
