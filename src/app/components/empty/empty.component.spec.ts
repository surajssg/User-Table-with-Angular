import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { EmptyComponent } from './empty.component';
import { Router } from '@angular/router';
import {Location} from "@angular/common";



describe('EmptyComponent', () => {
  let component: EmptyComponent;
  let fixture: ComponentFixture<EmptyComponent>;
  let router: Router;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({declarations: [EmptyComponent]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  
  it('navigate to "" redirects you to none', closeDialog(() => { 
    router.navigate(['']); 
    tick(); 
    expect(location.path()).toBe(''); 
  }));
  
});

function closeDialog(arg0: () => void): jasmine.ImplementationCallback | undefined {
  throw new Error('Function not implemented.');
}
