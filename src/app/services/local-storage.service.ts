// import { Injectable } from '@angular/core';
// import { elementAt } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class LocalStorageService {
//   constructor() {}

//   addDataLocalStorage(data: any) {
//     const storedArray = JSON.parse(localStorage.getItem('tableObject') || '[]');
//     if (storedArray) {
//       data.id = storedArray.length;
//       storedArray.push(data);
//       localStorage.setItem('tableObject', JSON.stringify(storedArray));
//     } else {
//       localStorage.setItem('tableObject', JSON.stringify(data));
//     }
//     console.log(storedArray);
//   }

//   getLocalStorageData() {
//     return JSON.parse(localStorage.getItem('tableObject') || '[]');
//   }

//   deleteLocalStorage(givenId: any) {
//     console.log(typeof givenId); 
//     let storedArray = JSON.parse(localStorage.getItem('tableObject') || '[]');
//     console.log(storedArray.length);
//     let arr = [...storedArray];
//     let filteredArray: any = [];     

//     arr.forEach((element) => {
//       console.log(element);
//       if (element.id != givenId) {
//         filteredArray.push(element);
//       }
//     });
//     console.log(filteredArray);

//     localStorage.setItem('tableObject', JSON.stringify(filteredArray));
//   }

//   updateLocalStorage(givenId: any, data: any) {
//     console.log(typeof givenId);
//     let storedArray = JSON.parse(localStorage.getItem('tableObject') || '[]');
//     console.log(storedArray.length);
//     let arr = [...storedArray];
//     let filteredArray: any = [];

//     arr.forEach((element) => {
//       console.log(element);
//       if (element.id == givenId) {
//         filteredArray.push(data);
//       } else {
//         filteredArray.push(element);
//       }
//     });
//     console.log(filteredArray);

//     localStorage.setItem('tableObject', JSON.stringify(filteredArray));
//   }
// }
