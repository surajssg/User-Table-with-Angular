import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DsService } from './shared/ds.service';
// import { LocalStorageService } from './services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
    private fbService:FirebaseService
  ) {}

  ngOnInit(): void {
  //this.getAllUsers();
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


  getAllUsers() {
    setInterval(() => {
      // const res = this.dataSource = this.localStorageData.getLocalStorageData();
      const res:any = this.fbService.getUser()
      //console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  };

  

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
          //console.log(id);
          this.fbService.deleteUser(id)

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
