import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DsService } from './services/shared/ds.service';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './services/firebase.service';
import { Subject } from 'rxjs';
import { EmptyComponent } from './components/empty/empty.component';
import {  Router } from '@angular/router';   

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private refreshneeded = new Subject<void>();
  text = '!!User deleted successfully';
  text4 = 'User added successfully';
  show:boolean = false;
  currentDate = new Date();
  displayedColumns: string[] = ['userName', 'date','age', 'mobile', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogService: DsService,
    private http: HttpClient,
    private fbService: FirebaseService ,
    private router : Router ,
  ) {}

  public ngOnInit(): void {  
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
        }
        this.getAllUsers();
      });
  }

  getAllUsers(): any {
    let arr: any = [];
    this.fbService.getUser().subscribe((res: any) => {
      if(res){
        console.log(res);
      let users = res;
      const keys = Object.keys(users);
      console.log(keys);
      keys.forEach((key, index) => {
        users[key].id = key;
        arr.push(users[key]);
      });
      }else{
        // this.dialog.open(EmptyComponent);
        this.router.navigate(['empty']);
      }
      this.dataSource = new MatTableDataSource(arr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(arr);
    });
  }
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
  async deleteUser(data: any) {
    console.log(data)
    this.dialogService
      .openConfirmDialog('Are you sure to do this operation?')
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.deleteUserFunction(data);
        }
      });
  }

  async deleteUserFunction(data: any) {
    const res = await new Promise<any>((response) => {
      this.fbService.deleteUser(data.id).subscribe(response);
    });

    this.snackBar.open(this.text.toString(), '', {
      duration: 3000,
      verticalPosition: 'top',
    });
    this.getAllUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
