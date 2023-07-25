import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUplaodComponent } from './file-upload.component';

describe('FileUplaodComponent', () => {
  let component: FileUplaodComponent;
  let fixture: ComponentFixture<FileUplaodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUplaodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUplaodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
