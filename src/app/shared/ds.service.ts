import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DsService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg:string){
    return this.dialog.open(ConfirmDialogComponent,{
      width:'390px',
      panelClass: 'confirm-dialog-container',
      disableClose:true,
      position: {top:"10px"},
      data : {
        message : msg
      }
    });
  }
}
