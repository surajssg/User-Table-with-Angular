import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';


describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    // TestBed.configureTestingModule({providers: [
    //   FirebaseService,
    //   HttpClientTestingModule
    // ]});
    // service = TestBed.inject(FirebaseService);
    // service = new FirebaseService();
  });

  //   it('#getValue should return real value', () => {
  //   return expect(service.getUser()).toBe('real value');
  // });
  
//   it('#getObservableValue should return value from observable',
//     (done: DoneFn) => {
//     service.getObservableValue().subscribe((value:any) => {
//       expect(value).toBe('observable value');
//       done();
//     });
//   });

// it('#getObservableValue should return value from observable',
//     (done: DoneFn) => {
//     service.getObservableValue().subscribe(value => {
//       expect(value).toBe('observable value');
//       done();
//     });
//   });
});
