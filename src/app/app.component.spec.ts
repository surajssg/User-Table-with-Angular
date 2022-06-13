import { ComponentFixture, TestBed ,fakeAsync,tick} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;

  const matSnackBarMock = {
    open: jasmine.createSpy('open').and.callThrough()
  }

  const matDialogMock = {
    open: jasmine.createSpy('open').and.returnValue({
      afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of('save'))
    })
  }

  const routerMock = {
    navigate: jasmine.createSpy('navigate').and.callThrough()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [
        {provide: MatDialog, useValue: matDialogMock},
        {provide: MatSnackBar, useValue: matSnackBarMock},
        {provide: Router, useValue: routerMock}
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    spyOn(component['fbService'], 'getUser').and.returnValue(of({
      user: {
        id: 'id'
      }
    }))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openDialog', () => {
    spyOn(component, 'getAllUsers').and.callThrough();
    component.openDialog();
    expect(component.getAllUsers).toHaveBeenCalled();
  });
})