import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevBlogsComponent } from './prev-blogs.component';

describe('PrevBlogsComponent', () => {
  let component: PrevBlogsComponent;
  let fixture: ComponentFixture<PrevBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevBlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
