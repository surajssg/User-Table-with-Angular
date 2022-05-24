import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DsService } from './services/shared/ds.service';
// import { LocalStorageService } from './services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './services/firebase.service';
// import { Observable,Subscription, interval  } from 'rxjs';
import { Subject} from 'rxjs'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  private refreshneeded = new Subject<void>(); 
  text = '!!User deleted successfully';
  text4 = 'User added successfully';

  displayedColumns: string[] = ['userName', 'age', 'mobile', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private dialogService: DsService,
    // private localStorageData: LocalStorageService,
    private http:HttpClient,
    private fbService:FirebaseService,
    // private updateSubscription: Subscription
    

    ) {};


 public ngOnInit():void {
  this.getAllUsers();
}


  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
         this.getAllUsers();
        }
      });
  }



  getAllUsers():any {
    let arr:any = []
    // this.fbService.getUser();
  this.fbService.getUser().subscribe((res:any) =>{
    console.log(typeof res)
    const users = res;
    const keys = Object.keys(users);
    keys.forEach((key, index) => {
      console.log(users[key])
      arr.push(users[key])
     
  });
  this.dataSource = new MatTableDataSource(arr);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  console.log()
    
  })
  }
  // const res = this.fbService.postArray;
  // this.fbService.getUser();
   
  

  // const res = this.fbService.postArray;
  
  // .subscribe((info:any) =>{
  //   console.log(info)
  // })
  // console.log(res)
  
  // setInterval(() => {
  //}, 4000);


    
    
    // const res = this.dataSource = this.localStorageData.getLocalStorageData();
  
  editUser(row: any) {
    this.dialogService
      .openConfirmDialog('Are you sure to do this operation?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {    
          this.dialog
            .open(DialogComponent, {
              width: '30%',
              data: row,
            })
            .afterClosed()
            .subscribe((val) => {
              if (val === 'update') {
              this.getAllUsers();
              }
            });
        }
      });
  }

  
  deleteUser(id:number) {
    this.dialogService
      .openConfirmDialog('Are you sure to do this operation?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.fbService.deleteUser(id).subscribe(responseData=>{
            console.log(responseData);
            // window. location. reload();
          })
          this.snackBar.open(this.text.toString(),'',{
            duration:3000,
            verticalPosition:'top'
          })
          this.getAllUsers();
        }
      });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
