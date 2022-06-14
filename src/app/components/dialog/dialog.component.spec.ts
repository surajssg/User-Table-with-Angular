import { TestBed  } from '@angular/core/testing'; 
import { DialogComponent } from './dialog.component';

describe('Component: User',() => {
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations : [ DialogComponent ]
        });
    })
    it('should create the app',()=>{
        let fixture = TestBed.createComponent(DialogComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    })
});