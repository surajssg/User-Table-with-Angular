import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { DsService } from 'src/app/services/shared/ds.service';
import { MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {
  constructor(
    private router : Router,
    private dialogService:DsService,
    private dialog:MatDialog,
    ) {
  }
  ngOnInit(): void {
  }
  closeDialog(){
    this.dialog.open(DialogComponent).afterClosed();
  };

}


